import { join } from 'path'
import LowDB from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { UnSport } from './UNSport'
import { sportFetchToSportDb, sportsSlotFetchToSlotDb } from '../utils/convertFetchToDb'
import { DBStructure } from './database.types'

require('dotenv').config()

export class FileDB {
  private db

  constructor () {
    // Use JSON file for storage and set default if absent
    const file = join(__dirname, '../../db.json')
    const adapter = new FileSync<DBStructure>(file, {
      defaultValue: {
        reservations: [],
        lastFetch: new Date(),
        sportsSlots: [],
        sports: []
      }
    })

    this.db = LowDB(adapter)

    // Do a default fetch for slots
    const unSport = new UnSport()
    unSport.init().then(() =>
      unSport.fetchSports().then(sports => {
        if (sports) {
          // Transform sports
          this.db.set('sports', sports.sports
            .map(sport => sportFetchToSportDb(sport)) as DBStructure['sports'])
            .value()

          // Transform sport slots
          this.db.set('sportsSlots', sports.sports
            .reduce((accu, sport) => [...accu, ...sportsSlotFetchToSlotDb(sport)], [] as DBStructure['sportsSlots']))
            .value()

          this.db.set('lastFetch', new Date()).value()

          this.db.write()
        }
      })
    )
  }

  get DB () {
    return this.db
  }
}

export const LocalDB = new FileDB()
// eslint-disable-next-line no-console
console.log('Database started')

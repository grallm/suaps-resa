import { join } from 'path'
import LowDB from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DBStructure } from '../models/database.types'
import { sportFetchToSportDb, sportsRegistrationsFetchToReservationsDb, sportsSlotFetchToSlotDb } from '../utils/convertFetchToDb'
import { UnSport } from './UNSport'

require('dotenv').config()

export class FileDB {
  private db

  constructor (initFetch = true) {
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
    if (initFetch) {
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

            // Add reservations from API
            this.db
              .get('reservations')
              .push(...sportsRegistrationsFetchToReservationsDb(sports.sports))

            this.db.write()
          }
        })
      )
    }
  }

  get DB () {
    return this.db
  }
}

export const LocalDB = new FileDB()
// eslint-disable-next-line no-console
console.log('Database started')

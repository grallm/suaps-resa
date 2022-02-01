import { join } from 'path'
import LowDB from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DBStructure } from '../../types'
import { UnSport } from './UNSport'

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
        sportsSlots: []
      }
    })

    this.db = LowDB(adapter)

    // Do a default fetch for slots
    const unSport = new UnSport()
    unSport.init().then(() =>
      unSport.fetchSports().then(sports => {
        if (sports) {
          this.db.set('sportsSlots', sports.sports).value()
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

export const db = new FileDB()
// eslint-disable-next-line no-console
console.log('Database started')

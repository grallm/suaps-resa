import { join } from 'path'
import LowDB from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DBStructure } from '../../types'

export class FileDB {
  private db

  constructor () {
    // Use JSON file for storage and set default if absent
    const file = join(__dirname, '../../db.json')
    const adapter = new FileSync<DBStructure>(file, {
      defaultValue: {
        reservations: [],
        lastFetch: null
      }
    })

    this.db = LowDB(adapter)
  }

  get DB () {
    return this.db
  }
}
export const db = new FileDB()

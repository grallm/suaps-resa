import { join } from 'path'
import { Low, JSONFile } from 'lowdb'
import { DBStructure } from '../../types'

export class FileDBController {
  private db: Low<DBStructure> | undefined

  constructor () {
    // Use JSON file for storage
    const file = join(__dirname, 'db.json')
    const adapter = new JSONFile<DBStructure>(file)
    this.db = new Low<DBStructure>(adapter)
  }

  get DB () {
    return this.db
  }

  /**
   * Set DB to default value or from file value
   */
  public async init () {
    if (!this.db) throw new Error('No DB initialized')

    // Read data from JSON file, this will set db.data content
    await this.db.read()

    // If file.json doesn't exist, db.data will be null
    // Set default data
    this.db.data = this.db.data || {
      reservations: [],
      lastFetch: null
    }
  }

  /**
   * Save DB to file
   */
  public async save () {
    await this.db?.write()
  }
}

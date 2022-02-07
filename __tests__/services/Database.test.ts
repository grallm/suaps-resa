import { readFileSync } from 'fs'
import path from 'path'
import { LocalDB } from '../../src/services/Database'

describe('Create a local database', () => {
  test('file exists in root folder', () => {
    try {
      expect(readFileSync(path.join(__dirname, '../../db.json'))).not.toBe(null)
    } catch (error) {
      // console.log(error)
      expect(error).toBe(null)
    }
  })

  test('all DBs are loaded', () => {
    // Loop all tables in file and check in DB
    try {
      const tables = JSON.parse(readFileSync(path.join(__dirname, '../../db.json'), 'utf-8'))

      for (const tableId in tables) {
        expect(LocalDB.DB.get(tableId).value()).not.toBe(undefined)
      }
    } catch (error) {
      // console.log(error)
      expect(error).toBe(null)
    }
  })
})

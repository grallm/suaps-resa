import { FileDB } from '../services/db'

export class ReservationController {
  private db: FileDB

  constructor (db: FileDB) {
    this.db = db
  }
}

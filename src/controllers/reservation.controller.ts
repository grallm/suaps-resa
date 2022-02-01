import { Reservation } from '../../types'
import { FileDB } from '../services/db'

export class ReservationController {
  private fileDB
  private db

  constructor (db: FileDB) {
    this.fileDB = db
    this.db = db.DB
  }

  get getAll (): Reservation[] {
    return this.db
      .get('reservations')
      .value()
  }
}

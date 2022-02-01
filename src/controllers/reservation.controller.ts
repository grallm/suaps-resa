import { Reservation } from '../../types'
import { FileDB } from '../services/db'
import { v4 as uuid } from 'uuid'

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

  /**
   * Add a Reservation
   * @param reservation
   */
  public add (reservation: Omit<Reservation, 'id'>) {
    this.db
      .get('reservations')
      .push({
        ...reservation,
        id: uuid()
      })
      .write()
  }
}

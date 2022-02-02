import { DBStructure, FileDB } from '../services/Database'
import { v4 as uuid } from 'uuid'
import { Reservation } from '../models/reservation.model'

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
  public add (reservation: Omit<DBStructure['reservations'][number], 'id'>) {
    this.db
      .get('reservations')
      .push({
        ...reservation,
        id: uuid()
      })
      .write()
  }
}

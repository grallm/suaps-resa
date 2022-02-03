import { FileDB } from '../services/Database'
import { v4 as uuid } from 'uuid'
import { Reservation } from '../models/reservation.model'

export class ReservationController {
  private fileDB
  private db

  constructor (db: FileDB) {
    this.fileDB = db
    this.db = db.DB.get('reservations')
  }

  get getAll (): Reservation[] {
    return this.db
      .value()
  }

  /**
   * Add a Reservation
   * @param reservation
   */
  public add (reservation: Omit<Reservation, 'id'>) {
    const id = uuid()

    this.db
      .push({
        ...reservation,
        id
      })
      .write()

    return this.db.find({ id }).value()
  }
}

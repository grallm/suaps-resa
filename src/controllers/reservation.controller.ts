import { FileDB } from '../services/Database'
import { v4 as uuid } from 'uuid'
import { Reservation } from '../models/reservation.model'
import ics from 'ics'

export class ReservationController {
  private db

  constructor (db: FileDB) {
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

  /**
   * Export all booked reservations as ICS
   */
  public getIcs () {
    const reservations = this.db.value()
    console.log(reservations)

    ics.createEvents(reservations.map(reserv => {
      const start = new Date(reserv.dateStart)
      const end = new Date(reserv.dateEnd)

      return {
        start: [
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes()
        ],
        end: [
          end.getFullYear(),
          end.getMonth(),
          end.getDate(),
          end.getHours(),
          end.getMinutes()
        ]
      } as ics.EventAttributes
    }))
  }
}

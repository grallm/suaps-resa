import { FileDB } from '../services/Database'
import { v4 as uuid } from 'uuid'
import { Reservation } from '../models/reservation.model'
import * as ics from 'ics'
import { DBSport } from '../models/database.types'

export class ReservationController {
  private fullDb
  private db

  constructor (db: FileDB) {
    this.fullDb = db.DB
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

    return ics.createEvents(reservations.map(reserv => {
      const start = new Date(reserv.dateStart)
      const end = new Date(reserv.dateEnd)

      const sport = this.fullDb
        .get('sports')
        .find({ code: reserv.sportId } as Partial<DBSport>)
        .value()

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
        ],
        location: reserv.location,
        title: sport.nom || 'sport',
        description: reserv.description
      } as ics.EventAttributes
    }))
  }
}

import { Reservation } from './reservation.model'
import { Creneau, SportList } from './sportsSlotsFetch.model'

export type DBSport = Omit<SportList, 'registrations' | 'creneaux'>
export type DBSportSlot = (Creneau & {
  sportId: number
  /**
   * ISOString
   */
  start: string
  /**
   * ISOString
   */
  end: string
})

export interface DBStructure {
  reservations: Reservation[]
  lastFetch: Date
  sports: DBSport[]
  sportsSlots: DBSportSlot[]
}

import { Reservation } from '../models/reservation.model'
import { Creneau, SportList } from '../models/sportsSlotsFetch.model'

export type DBSport = Omit<SportList, 'registrations' | 'creneaux'>
export type DBSportSlot = (Creneau & { sportId: number })

export interface DBStructure {
  reservations: Reservation[]
  lastFetch: Date
  sports: DBSport[]
  sportsSlots: DBSportSlot[]
}

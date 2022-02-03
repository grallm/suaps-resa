export interface Reservation {
  id: string
  sportId: number
  slotId: number
  /**
   * When is the slot, useful for exporting Calendar
   */
  dateStart: Date
  dateEnd: Date
  /**
   * When to start checking
   * - startCheck < now = not booked, continue fetching
   * - startCheck > now = booked
   */
  startCheck: Date
  /**
   * Should the reservation be done each week or disappear after done ?
   */
  recurrent: boolean
  booked: boolean
}

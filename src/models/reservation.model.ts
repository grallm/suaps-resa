export interface Reservation {
  id: string
  sportId: number
  slotId: number
  /**
   * ISOString
   *
   * When is the slot, useful for exporting Calendar
   */
  dateStart: string
  /**
   * ISOString
   *
   * When the slot finishes, useful for exporting Calendar
   */
  dateEnd: string
  /**
   * ISOString
   *
   * When to start checking
   * - startCheck < now = not booked, continue fetching
   * - startCheck > now = booked
   */
  startCheck: string
  /**
   * Should the reservation be done each week or disappear after done ?
   */
  recurrent: boolean
  booked: boolean
  location: string
  description: string
}

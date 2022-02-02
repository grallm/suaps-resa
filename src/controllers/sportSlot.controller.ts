import { FileDB } from '../services/Database'
import { DBSportSlot, DBStructure } from '../services/database.types'

export class SportSlotController {
  private db

  constructor (db: FileDB) {
    this.db = db.DB.get('sportsSlots')
  }

  get getAll (): DBSportSlot[] {
    return this.db
      .value()
  }

  /**
   * Find a slot
   * @param sportId
   * @param slotId
   * @returns
   */
  public getSportSlot (sportId: number, slotId: number): DBSportSlot | null {
    return this.db
      .find({
        code: slotId,
        sportId: sportId
      } as Partial<DBStructure['sportsSlots'][number]>)
      .value()
  }
}

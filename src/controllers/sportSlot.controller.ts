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
   * @param slotId
   * @returns
   */
  public getSportSlot (slotId: number): DBSportSlot | null {
    return this.db
      .find({
        code: slotId
      } as Partial<DBStructure['sportsSlots'][number]>)
      .value()
  }
}

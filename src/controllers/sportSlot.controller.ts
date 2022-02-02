import { FileDB } from '../services/Database'
import { DBSportSlot, DBStructure } from '../services/database.types'

export class SportSlotController {
  private db
  private db1

  constructor (db: FileDB) {
    this.db = db.DB.get('sportsSlots')
    this.db1 = db.DB
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
    console.log(sportId, slotId)
    return this.db1.get('sportsSlots')
      .find({
        code: slotId,
        sportId: sportId
      } as Partial<DBStructure['sportsSlots'][number]>)
      .value()
  }
}

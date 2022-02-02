import { SportList } from '../models/sportsSlotsFetch.model'
import { DBStructure } from '../services/database.types'

/**
 * Convert sport fetched to DB Sport type
 * @param sport fetched sport
 * @returns
 */
export const sportFetchToSportDb = ({ code, description, nom, categorie }: SportList): DBStructure['sports'][number] => ({
  code, description, nom, categorie
})

/**
 * Convert fetched sport's slots to DB slots type
 * @param sport fetched sport
 * @returns
 */
export const sportsSlotFetchToSlotDb = (sport: SportList): DBStructure['sportsSlots'] => {
  const sportId = sport.code

  return sport.creneaux.map(slot => ({
    ...slot,
    sportId
  }))
}

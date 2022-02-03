import { Creneau, SportList } from '../models/sportsSlotsFetch.model'
import { DBSportSlot, DBStructure } from '../services/database.types'

/**
 * Ordered French weekdays, starting from Sunday
 */
const weekDaysFr = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi'
]

/**
 * Convert sport fetched to DB Sport type
 * @param sport fetched sport
 * @returns
 */
export const sportFetchToSportDb = ({ code, description, nom, categorie }: SportList): DBStructure['sports'][number] => ({
  code, description, nom, categorie
})

/**
 * Extract start and end date of next slot's real time
 * @param slot
 */
export const getStartEndDate = (slot: Creneau): { start: Date, end: Date } | null => {
  const weekday = slot.jour
  const weekdayId = weekDaysFr.findIndex(day => day === weekday)

  const hourStartEnd = slot.heures // ex: 20h00 - 21h30

  const hourRgx = /^([0-9]{2})h([0-9]{2}).+([0-9]{2})h([0-9]{2})/

  const times = hourRgx.exec(hourStartEnd)

  if (times?.length !== 5 || weekdayId < 0 || weekdayId > 6) {
    // eslint-disable-next-line no-console
    console.error(`Date error: ${hourStartEnd} / ${weekday} / ${slot.code}`)

    return null
  }

  const start = new Date()

  // Find weekday, sercurize no infinite loop
  const todayId = start.getDay()
  while (start.getDay() !== weekdayId && start.getDay() !== todayId) start.setDate(start.getDate() + 1)

  // Start
  start.setHours(parseInt(times[1]))
  start.setMinutes(parseInt(times[2]))

  // End
  const end = new Date(start.getDate())
  end.setHours(parseInt(times[1]))
  end.setMinutes(parseInt(times[2]))

  return {
    start, end
  }
}

/**
 * Convert fetched sport's slots to DB slots type
 * @param sport fetched sport
 * @returns
 */
export const sportsSlotFetchToSlotDb = (sport: SportList): DBStructure['sportsSlots'] => {
  const sportId = sport.code

  return sport.creneaux.reduce((acc, slot) => {
    const dates = getStartEndDate(slot)

    if (!dates) {
      // eslint-disable-next-line no-console
      console.error(`Error with slot ${slot.code} date`)
      return acc
    }

    return [
      ...acc,
      {
        ...slot,
        sportId,
        start: dates.start,
        end: dates.end
      }
    ]
  }, [] as DBSportSlot[])
}

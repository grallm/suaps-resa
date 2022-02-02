import express from 'express'
import { LocalDB } from '../services/Database'
import { UnSport } from '../services/UNSport'

export const rootRouter = express.Router()

/**
 * Force to fetch last slots
 */
rootRouter.get('/forceFetch', async (req, res) => {
  try {
    const unsport = new UnSport()
    await unsport.init()

    const sports = await unsport.fetchSports()

    if (!sports) throw new Error('No response')

    LocalDB.DB.set('lastFetch', new Date()).value()
    LocalDB.DB.set('sportsSlots', sports.sports).value()

    await LocalDB.DB.write()

    return res.send(sports.sports)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)

    return res.status(500).send(err)
  }
})

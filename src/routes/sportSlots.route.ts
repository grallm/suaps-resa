import express, { Request } from 'express'
import { LocalDB } from '../services/Database'
import { SportSlotController } from '../controllers/sportSlot.controller'
import { param, validationResult } from 'express-validator'
import { UnSport } from '../services/UNSport'
import { ReservationController } from '../controllers/reservation.controller'

export const sportSlotRouter = express.Router()

const reservationController = new ReservationController(LocalDB)
const sportSlotController = new SportSlotController(LocalDB)

/**
 * Get all sport slots
 */
sportSlotRouter.get('/', (req, res) => {
  return res.send(sportSlotController.getAll)
})

/**
 * Get a sport slot from its ID
 * @param {number} slotId
 */
sportSlotRouter.get(
  '/:id',
  param('id').isNumeric(),
  (req: Request<{
    id: string
  }>, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const found = sportSlotController.getSportSlot(parseInt(req.params.id))

    return found ? res.send(found) : res.sendStatus(404)
  }
)

/**
 * Book a specific slot
 * @param {number} slotId Slot to book
 * @returns Created Reservation or error
 */
sportSlotRouter.put(
  '/:id',
  param('id').isNumeric().custom((body) => {
    // Check if slot exists
    if (
      body.sportId && body.slotId &&
      !sportSlotController.getSportSlot(parseInt(body.slotId))
    ) {
      throw new Error('Slot not found')
    }
    return true
  }),
  async (req: Request<{
    id: string
  }>, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const slot = sportSlotController.getSportSlot(parseInt(req.params.id))

    try {
      const unsport = new UnSport()
      await unsport.init()
      const resultBook = await unsport.bookSlot(parseInt(req.params.id))

      if (resultBook.booked) {
        if (!slot) return res.sendStatus(404)

        // Success
        return res.send(
          // Create reservation
          reservationController.add({
            slotId: parseInt(req.params.id),
            sportId: slot.sportId,
            dateStart: slot.start,
            dateEnd: slot.end,
            recurrent: false,
            startCheck: new Date().toISOString(),
            booked: true
          })
        )
      } else {
        return res.status(400).send({
          error: resultBook.error
        })
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)

      return res.status(500).send(err)
    }
  }
)

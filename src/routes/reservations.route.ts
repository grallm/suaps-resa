import express from 'express'
import { LocalDB } from '../services/Database'
import { ReservationController } from '../controllers/reservation.controller'
import { body, validationResult } from 'express-validator'
import { SportSlotController } from '../controllers/sportSlot.controller'

export const reservationRouter = express.Router()

const reservationController = new ReservationController(LocalDB)
const sportSlotController = new SportSlotController(LocalDB)

/**
 * Get all reservations
 */
reservationRouter.get('/', (req, res) => {
  return res.send(reservationController.getAll)
})

/**
 * Add a Reservation
 * @param {number} slotId
 * @param {boolean} recurrent should reservation be done each week or once ?
 */
reservationRouter.post(
  '/',
  body(['slotId']).isNumeric().custom((body) => {
    // Check if slot exists
    if (
      body.sportId && body.slotId &&
      !sportSlotController.getSportSlot(parseInt(body.slotId))
    ) {
      throw new Error('Slot not found')
    }
    return true
  }),
  body('recurrent').optional().isBoolean(),
  (req: express.Request<{}, {}, {
    sportId: string
    slotId: string
    recurrent?: boolean
  }>, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const slot = sportSlotController.getSportSlot(
      parseInt(req.body.slotId)
    )

    if (!slot) return res.sendStatus(404)

    return res.send(
      reservationController.add({
        slotId: parseInt(req.body.slotId),
        sportId: slot.sportId,
        dateStart: slot.start,
        dateEnd: slot.end,
        recurrent: req.body.recurrent || false,
        startCheck: new Date(),
        booked: false
      })
    )
  }
)

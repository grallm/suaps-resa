import express from 'express'
import { DBStructure, LocalDB } from '../services/Database'
import { ReservationController } from '../controllers/reservation.controller'
import { body, validationResult } from 'express-validator'

export const reservationRouter = express.Router()

const reservationController = new ReservationController(LocalDB)

/**
 * Get all reservations
 */
reservationRouter.get('/', (req, res) => {
  return res.send(reservationController.getAll)
})

/**
 * Add a Reservation
 * @param {string} sportId
 * @param {string} slotId
 * @param {boolean} recurrent should reservation be done each week or once ?
 */
reservationRouter.post(
  '/',
  body(['sportId', 'slotId']).isNumeric(),
  body('recurrent').optional().isBoolean(),
  body().custom((body) => {
    // Check if slot exists
    if (body.sportId && body.slotId) {
      LocalDB.DB
        .get('sportsSlots')
        .find({
          code: body.slotId,
          sportId: body.sportId
        } as Partial<DBStructure['sportsSlots'][number]>)
        .value()
    }
  }),
  (req: express.Request<{}, {}, {
    sportId: number
    slotId: number
    recurrent?: boolean
  }>, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    reservationController.add({
      slotId: req.body.slotId,
      sportId: req.body.sportId,
      date: new Date(),
      recurrent: req.body.recurrent || false,
      startCheck: new Date()
    })

    return res.send()
  }
)

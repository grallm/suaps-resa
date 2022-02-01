import express from 'express'
import { db } from '../services/db'
import { ReservationController } from '../controllers/reservation.controller'
import { body, validationResult } from 'express-validator'

export const reservationRouter = express.Router()

const reservationController = new ReservationController(db)

/**
 * Get all reservations
 */
reservationRouter.get('/', (req, res) => {
  return res.send(reservationController.getAll)
})

/**
 * Add a Reservation
 */
reservationRouter.post(
  '/',
  body(['sportId', 'slotId']).isNumeric(),
  body('recurrent').optional().isBoolean(),
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
      recurrent: req.body.recurrent || false
    })

    return res.send()
  }
)

import express from 'express'
import { db } from '../services/db'
import { ReservationController } from '../controllers/reservation.controller'

export const reservationRouter = express.Router()

const reservationController = new ReservationController(db)

/**
 * Get all reservations
 */
reservationRouter.get('/', (req, res) => {
  res.send(reservationController.getAll)
})

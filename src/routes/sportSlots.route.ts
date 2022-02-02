import express from 'express'
import { LocalDB } from '../services/Database'
import { SportSlotController } from '../controllers/sportSlot.controller'
import { param, validationResult } from 'express-validator'

export const sportSlotRouter = express.Router()

const sportSlotController = new SportSlotController(LocalDB)

/**
 * Get all sport slots
 */
sportSlotRouter.get('/', (req, res) => {
  return res.send(sportSlotController.getAll)
})

/**
 * Get a sport slot from its ID
 */
sportSlotRouter.get(
  '/:id',
  param('id').isNumeric(),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    return res.send(LocalDB.DB.get('sportsSlots').find({ code: req.params!.id }).value() || null)
  }
)

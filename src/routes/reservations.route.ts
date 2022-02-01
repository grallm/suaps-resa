import express from 'express'

export const reservationRouter = express.Router()

reservationRouter.get('/', (req, res) => {
  res.send('test')
})

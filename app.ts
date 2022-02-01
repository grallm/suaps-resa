import express from 'express'
import responseTime from 'response-time'
import { reservationRouter } from './src/routes/reservations.route'

require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'development') {
  console.log('Starting server in development mode')
  app.use(responseTime((req, res, time) => {
    console.log(`${req.method} ${req.url} ${time}ms`)
  }))
}

// Define all routes
app.use('/reservations', reservationRouter)

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`)
})

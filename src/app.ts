import express from 'express'
import morgan from 'morgan'
import { reservationRouter } from './routes/reservations.route'

require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'development') {
  console.log('Starting server in development mode')
  app.use(morgan('tiny'))
}

// Define all routes
app.use('/reservations', reservationRouter)

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`)
})

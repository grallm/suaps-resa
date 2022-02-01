import express from 'express'
import morgan from 'morgan'
import { rootRouter } from './controllers/root.controller'
import { reservationRouter } from './routes/reservations.route'

require('dotenv').config()

const app = express()

// Add usage of Body for POST request
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.log('Starting server in development mode')
  app.use(morgan('tiny'))
}

// Define all routes
app.use('/reservations', reservationRouter)
app.use('/', rootRouter)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Your app is listening on port ${PORT}`)
})

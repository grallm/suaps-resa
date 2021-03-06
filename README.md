# UNSports Reservation

Application to check availability for sports slots at Nantes University and book them

## About
Created because slots are quickly taken for some sports, it also happens that they forget to book one.

A bot to automatically book and check is **ESSENTIAL**.

### Built with
- NodeJS
- TypeScript
- [Puppeteer](https://github.com/puppeteer/puppeteer/) for all HTTP requests, such as auth with CAS
- [LowDB (v1.0.0)](https://github.com/typicode/lowdb) for a local DB, storing: reservations, slots, sports

### Goals
- Discover CI/CD with Github Actions
- Try Puppeteer
- Try Lodash
- Practice good practices (tests, linter, Express structures...)
- Get my sport slots !

## REST API routes
### Slots
#### GET /slots/
Get all slots available

#### GET /slots/:id
- **Param** *number* id : Slot ID
Get a specific slot

#### PUT /slots/:id
- **Param** *number* id : Slot ID
Book a slot


### Reservations
#### GET /reservations/
Get all reservations

#### GET /reservations/ics
Get all reservations under ICS format

#### POST /reservations/
- **Body** *number* slotId : Slot ID
- **Body** *number* recurrent : Is the booking recurrent (each week) ?
Book a slot


### Other
#### GET /forceFetch/
Force to fetch slots


## Roadmap

- [x] Connect to university's CAS (= Central Authentication Service) using env variable
- [x] Fetch all slots for some sports
- [x] Check availability for these slots
- [x] Book slots
- [x] Specify interesting slots
- [x] Export booked slots to ICS
- [x] Add a few tests
- [x] GitHub CI/CD
- [ ] Use CRON to:
  - [ ] regularly check availbility
  - [ ] book recurrent and not

## License
[MIT](https://choosealicense.com/licenses/mit/)
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

## Roadmap

- [x] Connect to university's CAS (= Central Authentication Service) using env variable
- [x] Fetch all slots for some sports
- [x] Check availability for these slots
- [x] Book slots
- [x] Specify interesting slots
- [ ] Export booked slots to ICS
- [ ] Add a few tests
- [ ] GitHub CI/CD
- [ ] Use CRON to regularly check availbility and to book

## License
[MIT](https://choosealicense.com/licenses/mit/)
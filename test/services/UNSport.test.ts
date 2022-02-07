import { UnSport } from '../../src/services/UNSport'

require('dotenv').config()

const unsport = new UnSport()

describe('UNSport class for manipulating API', () => {
  jest.setTimeout(25000)
  beforeAll(async () => {
    return await unsport.init()
  })

  test('fetch Sports, Slots, and Reservations', async () => {
    expect(await unsport.fetchSports()).not.toBe(null)
  })
})

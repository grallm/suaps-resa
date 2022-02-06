import { UnSport } from '../../src/services/UNSport'

describe('UNSport class for manipulating API', () => {
  const unsport = new UnSport()

  beforeAll(async () => {
    // await unsport.init()
  })

  test('well authenticated to Nantes University CAS', async () => {
    expect(await unsport.bookSlot(0)).toEqual(
      expect.objectContaining<Awaited<ReturnType<UnSport['bookSlot']>>>({
        booked: true
      })
    )
  })

  test.todo('fetch Sports, Slots, and Reservations')

  // test('book a slot', async () => {
  //   expect(await unsport.bookSlot(590)).toEqual(
  //     expect.objectContaining<Awaited<ReturnType<UnSport['bookSlot']>>>({
  //       booked: true
  //     })
  //   )
  // })
})

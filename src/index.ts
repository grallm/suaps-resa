import { UnSport } from './UnSport'

require('dotenv').config()

const main = async () => {
  const unSport = new UnSport()
  await unSport.init()
  await unSport.fetchSports()
}

main().catch(err => {
  console.error(err)
})

import { UnSport } from './services/UNSport'

const main = async () => {
  const unSport = new UnSport()
  await unSport.init()
  await unSport.fetchSports()
}

main().catch(err => {
  console.error(err)
})

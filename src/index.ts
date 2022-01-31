import puppeteer from 'puppeteer'
import { UserSports } from './types'

// const initUrl = 'https://unsport.univ-nantes.fr/'
const initUrl = 'https://cas-ha.univ-nantes.fr/esup-cas-server/login?service=https://unsport.univ-nantes.fr/web/authenticate'

require('dotenv').config()

/**
 * Authenticate to NU CAS and fetch sports and slots
 */
const fetchUserSports = async () => {
  if (!process.env.NU_AUTH_USERNAME || !process.env.NU_AUTH_PWD) {
    throw new Error('Missing Auth')
  }

  const browser = await puppeteer.launch({
    headless: false
  })

  const page = await browser.newPage()
  await page.goto(initUrl)

  // Fill and submit auth form
  await page.type('#username', process.env.NU_AUTH_USERNAME)
  await page.type('#password', process.env.NU_AUTH_PWD)
  await page.keyboard.press('Enter')

  // Wait for auth page to finish submitting
  await page.waitForNavigation()

  // Fetch for user sports data
  await page.goto('https://unsport.univ-nantes.fr/web/api/user')

  const userSportsFetch = await page.evaluate(() => document.body.textContent)

  if (!userSportsFetch) throw new Error('Error when fetching sports')

  const userSports = JSON.parse(userSportsFetch) as UserSports
  console.log(userSportsFetch)
  // console.log(userSports)

  await browser.close()
}

fetchUserSports().catch(err => {
  console.error(err)
})

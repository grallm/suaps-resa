import puppeteer from 'puppeteer'
import { UserSports } from '../models/sportsSlotsFetch.model'

const initUrl = 'https://cas-ha.univ-nantes.fr/esup-cas-server/login?service=https://unsport.univ-nantes.fr/web/authenticate'
const bookUrl = 'https://unsport.univ-nantes.fr/web/api/creneaux/'

export class UnSport {
  private browser: puppeteer.Browser | undefined
  private page: puppeteer.Page | undefined

  /**
   * Authenticate user to UNSport with NU CAS
   */
  public async init () {
    if (!process.env.NU_AUTH_USERNAME || !process.env.NU_AUTH_PWD) {
      throw new Error('Missing Auth')
    }

    this.browser = await puppeteer.launch()

    this.page = await this.browser.newPage()
    await this.page.goto(initUrl)

    // Fill and submit auth form
    await this.page.type('#username', process.env.NU_AUTH_USERNAME)
    await this.page.type('#password', process.env.NU_AUTH_PWD)
    await this.page.keyboard.press('Enter')

    // Wait for auth page to finish submitting
    await this.page.waitForNavigation()
  }

  /**
   * Fetch all user's sports and slots
   */
  public async fetchSports (): Promise<UserSports | null> {
    if (!this.page) throw new Error('Page not initialized')

    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV === 'development') console.log('Fetching UNSport...')

    try {
      await this.page.goto('https://unsport.univ-nantes.fr/web/api/user')

      const userSportsFetch = await this.page.evaluate(() => document.body.textContent)

      if (!userSportsFetch) throw new Error('Error when fetching sports')

      const userSports = JSON.parse(userSportsFetch) as UserSports

      // eslint-disable-next-line no-console
      if (process.env.NODE_ENV === 'development') console.log('Successfuly fetched UNSport !')

      return userSports
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      return null
    }
  }

  /**
   * Book a UNSport slot
   * @param slotId
   */
  public async bookSlot (slotId: number): Promise<{
    booked: true
  }| {
    booked: false
    error: unknown
  }> {
    if (!this.page) throw new Error('Page not initialized')

    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV === 'development') console.log(`Booking ${slotId}...`)

    try {
      // Adapting request to PUT
      await this.page.setRequestInterception(true)

      this.page.once('request', req => {
        req.continue({
          method: 'PUT'
        })
      })

      // Building URL
      const bookUrlBuilt = new URL(slotId.toString(), bookUrl)
      bookUrlBuilt.searchParams.set('typePersonne', 'GE')

      const res = await this.page.goto(bookUrlBuilt.href)

      return (res.ok())
        ? {
            booked: true
          }
        : {
            booked: false,
            error: await res.json()
          }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      return {
        booked: false,
        error
      }
    }
  }

  /**
   * Close headless browser
   */
  public async closeBrowser () {
    await this.browser?.close()
  }
}

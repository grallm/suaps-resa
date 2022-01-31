import puppeteer from 'puppeteer'

// const initUrl = 'https://madoc.univ-nantes.fr/'
const initUrl = 'https://unsport.univ-nantes.fr/'

const main = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false
    })

    const page = await browser.newPage()
    await page.goto(initUrl)

    // Redirect to auth page
    await page.click('button:nth-of-type(2)')

    // Wait for auth page to load
    await page.waitForNavigation({
      waitUntil: 'networkidle2'
    })

    await browser.close()
  } catch (error) {
    console.error(error)
  }
}

main().catch(err => {
  console.error(err)
})

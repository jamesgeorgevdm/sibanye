import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
await page.addInitScript(() => localStorage.setItem('sibanye-intro-seen', 'true'))
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
await page.waitForTimeout(300)

const read = () =>
  page.evaluate(() => {
    const w = document.querySelector('main > div')
    const s = getComputedStyle(w)
    return { opacity: s.opacity, hasTransition: s.transitionDuration !== '0s', className: w.className }
  })

console.log('before nav:', await read())
await page.click('a[href="/about"]')
await page.waitForURL('**/about')

const timeline = []
for (let i = 0; i < 20; i++) {
  timeline.push({ ms: i * 25, ...(await read()) })
  await page.waitForTimeout(25)
}
console.log('timeline after nav to /about:')
console.table(timeline)

await browser.close()

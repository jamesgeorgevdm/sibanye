import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
await page.addInitScript(() => {
  localStorage.setItem('sibanye-intro-seen', 'true')
  sessionStorage.setItem('sibanye-page-mounted', '1')
})
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)

await page.evaluate(() => {
  window.__samples = []
  const read = () => {
    const el = document.querySelector('main > div')
    if (!el) return
    window.__samples.push({
      t: Math.round(performance.now()),
      op: getComputedStyle(el).opacity,
      cls: el.className,
    })
  }
  setInterval(read, 8)
})

await page.click('a[href="/about"]')
await page.waitForTimeout(1200)

const samples = await page.evaluate(() => window.__samples)
const navStart = samples.findIndex((s) => s.cls.includes('animate-page-fade-in'))
const window = samples.slice(Math.max(0, navStart - 2), navStart + 30)

console.log('Samples from navigation remount:')
for (const s of window) {
  console.log(`  t=${s.t} op=${s.op} cls=${s.cls.trim()}`)
}

const firstNewPage = window[0]
const flash = firstNewPage && Number(firstNewPage.op) > 0.9
console.log('\nFlash on first frame of new page:', flash)
await browser.close()

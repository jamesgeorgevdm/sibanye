import { chromium } from 'playwright'

const BASE = 'http://localhost:3000'
const INTRO_KEY = 'sibanye-intro-seen'
const SESSION_KEY = 'sibanye-page-mounted'

async function getWrapperState(page) {
  return page.evaluate(() => {
    const wrapper = document.querySelector('main > div')
    if (!wrapper) return null
    const style = getComputedStyle(wrapper)
    return {
      opacity: style.opacity,
      className: wrapper.className,
      hasAnimation: style.animationName !== 'none',
    }
  })
}

async function run() {
  const browser = await chromium.launch({ headless: true })
  const results = []

  // Test 1: First visit — intro then instant content
  {
    const ctx = await browser.newContext()
    const page = await ctx.newPage()
    await page.goto(BASE, { waitUntil: 'networkidle' })
    await page.waitForTimeout(100)
    const duringIntro = await getWrapperState(page)
    await page.waitForTimeout(3600)
    const afterIntro = await getWrapperState(page)
    const introSeen = await page.evaluate((k) => localStorage.getItem(k), INTRO_KEY)

    results.push({
      test: 'First visit: intro then instant content',
      pass:
        duringIntro?.opacity === '0' &&
        afterIntro?.opacity === '1' &&
        !afterIntro?.hasAnimation &&
        introSeen === 'true',
      details: { duringIntro, afterIntro, introSeen },
    })
    await ctx.close()
  }

  // Test 2: Return visit home — instant, no intro
  {
    const ctx = await browser.newContext()
    const page = await ctx.newPage()
    await page.addInitScript((k) => localStorage.setItem(k, 'true'), INTRO_KEY)
    await page.goto(BASE, { waitUntil: 'networkidle' })
    await page.waitForTimeout(300)
    const state = await getWrapperState(page)

    results.push({
      test: 'Return visit home: instant content, no intro',
      pass: state?.opacity === '1' && !state?.hasAnimation,
      details: { state },
    })
    await ctx.close()
  }

  // Test 3: Navigation fades
  {
    const ctx = await browser.newContext()
    const page = await ctx.newPage()
    await page.addInitScript((k, s) => {
      localStorage.setItem(k, 'true')
      sessionStorage.setItem(s, '1')
    }, INTRO_KEY, SESSION_KEY)
    await page.goto(BASE, { waitUntil: 'networkidle' })
    await page.waitForTimeout(300)

    const navFadeWorks = async (href) => {
      await page.click(`a[href="${href}"]`)
      await page.waitForURL(href === '/' ? BASE : `**${href}`)
      await page.waitForTimeout(80)
      const mid = await getWrapperState(page)
      await page.waitForTimeout(800)
      const end = await getWrapperState(page)
      return {
        midOpacity: mid?.opacity,
        hasAnimation: mid?.hasAnimation,
        endOpacity: end?.opacity,
        passed:
          Number(mid?.opacity) < 0.1 &&
          mid?.hasAnimation &&
          end?.opacity === '1',
      }
    }

    const about = await navFadeWorks('/about')
    const gallery = await navFadeWorks('/gallery')
    const home = await navFadeWorks('/')

    results.push({
      test: 'Navigation fades: About, Gallery, back Home',
      pass: about.passed && gallery.passed && home.passed,
      details: { about, gallery, home },
    })
    await ctx.close()
  }

  await browser.close()

  console.log('\n=== Animation test results ===\n')
  let allPass = true
  for (const r of results) {
    console.log(`[${r.pass ? 'PASS' : 'FAIL'}] ${r.test}`)
    console.log('       ', JSON.stringify(r.details))
    if (!r.pass) allPass = false
  }
  console.log(allPass ? '\nAll tests passed.' : '\nSome tests failed.')
  process.exit(allPass ? 0 : 1)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})

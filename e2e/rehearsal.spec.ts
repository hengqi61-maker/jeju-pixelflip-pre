import { expect, test, type Page } from '@playwright/test'

type SceneExpectation = {
  id: string
  title: string
}

type HotspotChain = {
  parent: SceneExpectation
  hotspot: string
  child: SceneExpectation
}

const scenes: SceneExpectation[] = [
  { id: 'cover-overview', title: 'Jeju Overview' },
  { id: 'spatial-structure', title: 'Spatial Structure' },
  { id: 'core-sight-map', title: 'Core Sight Map' },
  { id: 'recommended-routes', title: 'Recommended Routes' },
  { id: 'travel-advice-summary', title: 'Travel Advice Summary' },
  { id: 'ext-hallasan', title: 'Hallasan' },
  { id: 'ext-seongsan', title: 'Seongsan Ilchulbong' },
  { id: 'ext-udo', title: 'Udo' },
  { id: 'ext-jusangjeolli', title: 'Jusangjeolli Cliffs' },
  { id: 'ext-waterfalls', title: 'Waterfalls' },
  { id: 'ext-jeju-culture', title: 'Jeju Culture' },
  { id: 'ext-food', title: 'Food' },
  { id: 'ext-dongmun-market', title: 'Dongmun Market' },
  { id: 'ext-one-day-route', title: 'One-day Route' },
  { id: 'ext-three-day-route', title: 'Three-day Route' },
  { id: 'ext-best-seasons', title: 'Best Seasons' },
  { id: 'ext-travel-tips', title: 'Travel Tips' },
]

const parents = {
  overview: { id: 'cover-overview', title: 'Jeju Overview' },
  spatial: { id: 'spatial-structure', title: 'Spatial Structure' },
  core: { id: 'core-sight-map', title: 'Core Sight Map' },
  routes: { id: 'recommended-routes', title: 'Recommended Routes' },
  advice: { id: 'travel-advice-summary', title: 'Travel Advice Summary' },
} satisfies Record<string, SceneExpectation>

const children = {
  hallasan: { id: 'ext-hallasan', title: 'Hallasan' },
  seongsan: { id: 'ext-seongsan', title: 'Seongsan Ilchulbong' },
  udo: { id: 'ext-udo', title: 'Udo' },
  jusangjeolli: { id: 'ext-jusangjeolli', title: 'Jusangjeolli Cliffs' },
  waterfalls: { id: 'ext-waterfalls', title: 'Waterfalls' },
  culture: { id: 'ext-jeju-culture', title: 'Jeju Culture' },
  food: { id: 'ext-food', title: 'Food' },
  market: { id: 'ext-dongmun-market', title: 'Dongmun Market' },
  oneDayRoute: { id: 'ext-one-day-route', title: 'One-day Route' },
  threeDayRoute: { id: 'ext-three-day-route', title: 'Three-day Route' },
  bestSeasons: { id: 'ext-best-seasons', title: 'Best Seasons' },
  travelTips: { id: 'ext-travel-tips', title: 'Travel Tips' },
} satisfies Record<string, SceneExpectation>

const hotspotChains: HotspotChain[] = [
  { parent: parents.overview, hotspot: 'Hallasan', child: children.hallasan },
  {
    parent: parents.overview,
    hotspot: 'Seongsan Ilchulbong',
    child: children.seongsan,
  },
  { parent: parents.overview, hotspot: 'Udo', child: children.udo },
  { parent: parents.overview, hotspot: 'Waterfalls', child: children.waterfalls },
  { parent: parents.overview, hotspot: 'Dongmun Market', child: children.market },
  { parent: parents.overview, hotspot: 'Food', child: children.food },
  {
    parent: parents.spatial,
    hotspot: 'Central Mountain Core',
    child: children.hallasan,
  },
  { parent: parents.spatial, hotspot: 'East Coast', child: children.seongsan },
  { parent: parents.spatial, hotspot: 'Udo Link', child: children.udo },
  {
    parent: parents.spatial,
    hotspot: 'Geological Coast',
    child: children.jusangjeolli,
  },
  {
    parent: parents.spatial,
    hotspot: 'South Scenic Belt',
    child: children.waterfalls,
  },
  { parent: parents.core, hotspot: 'Hallasan', child: children.hallasan },
  {
    parent: parents.core,
    hotspot: 'Seongsan Ilchulbong',
    child: children.seongsan,
  },
  { parent: parents.core, hotspot: 'Udo', child: children.udo },
  {
    parent: parents.core,
    hotspot: 'Jusangjeolli Cliffs',
    child: children.jusangjeolli,
  },
  { parent: parents.core, hotspot: 'Waterfalls', child: children.waterfalls },
  { parent: parents.core, hotspot: 'Jeju Culture', child: children.culture },
  { parent: parents.core, hotspot: 'Food', child: children.food },
  { parent: parents.core, hotspot: 'Dongmun Market', child: children.market },
  {
    parent: parents.routes,
    hotspot: 'One-day Route',
    child: children.oneDayRoute,
  },
  {
    parent: parents.routes,
    hotspot: 'Three-day Route',
    child: children.threeDayRoute,
  },
  {
    parent: parents.routes,
    hotspot: 'Best Seasons',
    child: children.bestSeasons,
  },
  {
    parent: parents.advice,
    hotspot: 'Best Seasons',
    child: children.bestSeasons,
  },
  {
    parent: parents.advice,
    hotspot: 'Travel Tips',
    child: children.travelTips,
  },
]

async function expectScene(page: Page, scene: SceneExpectation) {
  await expect(page).toHaveURL(new RegExp(`[?&]scene=${scene.id}(?:&|$)`))
  await expect(page.locator('.content-panel-summary-trigger strong')).toHaveText(
    scene.title,
  )
  await expect(page.locator('.scene-fallback-label')).toHaveText(scene.id)
  await expect(page).toHaveURL(/[?&]qa=1(?:&|$)/)
}

async function expectBackgroundLoaded(page: Page) {
  const background = page.locator('.scene-asset-background')
  await expect(background).toBeVisible()
  await expect(background).toHaveJSProperty('complete', true)
  await expect
    .poll(async () =>
      background.evaluate((image) =>
        image instanceof HTMLImageElement ? image.naturalWidth : 0,
      ),
    )
    .toBeGreaterThan(0)
}

test.describe('17-scene direct-load rehearsal', () => {
  for (const scene of scenes) {
    test(`${scene.id} loads with title, URL state, and background`, async ({
      page,
    }) => {
      await page.goto(`/?scene=${scene.id}&qa=1`)
      await expectScene(page, scene)
      await expectBackgroundLoaded(page)
    })
  }
})

test.describe('parent hotspot continuity rehearsal', () => {
  for (const chain of hotspotChains) {
    test(`${chain.parent.id} -> ${chain.child.id} -> app back`, async ({
      page,
    }) => {
      await page.goto(`/?scene=${chain.parent.id}&qa=1`)
      await expectScene(page, chain.parent)
      await page.waitForTimeout(400)
      await page.getByRole('button', { name: chain.hotspot, exact: true }).click()
      await expectScene(page, chain.child)
      await expectBackgroundLoaded(page)
      await page.getByRole('button', { name: 'Back', exact: true }).click()
      await expectScene(page, chain.parent)
    })
  }
})

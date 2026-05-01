import { expect, test, type Page } from '@playwright/test'

async function expectScene(page: Page, sceneId: string, title: string) {
  await expect(page).toHaveURL(new RegExp(`[?&]scene=${sceneId}(?:&|$)`))
  await expect(page.locator('.content-panel-summary-trigger strong')).toHaveText(
    title,
  )
  await expect(page.locator('.scene-fallback-label')).toHaveText(sceneId)
}

test('core sight map branch stays synchronized across browser and app back paths', async ({
  page,
}) => {
  await page.goto('/?scene=core-sight-map&qa=1')
  await expectScene(page, 'core-sight-map', 'Core Sight Map')
  await expect(page).toHaveURL(/[?&]qa=1(?:&|$)/)

  await page.getByRole('button', { name: 'Seongsan Ilchulbong' }).click()
  await expectScene(page, 'ext-seongsan', 'Seongsan Ilchulbong')
  await expect(page).toHaveURL(/[?&]qa=1(?:&|$)/)

  await page.goBack()
  await expectScene(page, 'core-sight-map', 'Core Sight Map')
  await expect(page).toHaveURL(/[?&]qa=1(?:&|$)/)

  await page.goForward()
  await expectScene(page, 'ext-seongsan', 'Seongsan Ilchulbong')
  await expect(page).toHaveURL(/[?&]qa=1(?:&|$)/)

  await page.getByRole('button', { name: 'Back' }).click()
  await expectScene(page, 'core-sight-map', 'Core Sight Map')
  await expect(page).toHaveURL(/[?&]qa=1(?:&|$)/)
})

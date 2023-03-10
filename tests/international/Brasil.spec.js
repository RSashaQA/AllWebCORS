import logger from "../../logger.js"
const { test, expect } = require("@playwright/test");
const { broadcaster } = require("../../constants")
test.setTimeout(120000);
test.use({
  viewport: { width: 1920, height: 1080 },
  ignoreHTTPSErrors: true,
  // extraHTTPHeaders: {
  //   Accept: '*/*',
  //   Referer: 'https://brasilaovivo.tv/',
  //   Origin: 'https://brasilaovivo.tv',
  //   Connection: 'keep-alive'
  // }
});

test("visit brasilaovivo.tv website and check errors in console with logger", async ({ page }) => {

  logger(page)
  
  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://brasilaovivo.tv/rede_nova_tv');
  expect(response.status()).toBeLessThan(400);

  try {
    await page.locator('.vjs-big-play-button').click({ timeout: 2000 });
  } catch (error) {}

  await page.waitForResponse(resp => resp.url().includes(broadcaster), { timeout: 50000 })

  await page.waitForTimeout(5000)
  //await page.screenshot({ path: "screenshots/brasilaovivo.tv.png" })
})
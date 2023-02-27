import logger from "../../logger.js"
const { test, expect } = require("@playwright/test");
const { broadcaster } = require("../../constants")
test.setTimeout(120000);
test.use({
  viewport: { width: 1920, height: 1080 },
  ignoreHTTPSErrors: true,
  // extraHTTPHeaders: {
  //   Accept: '*/*',
  //   Referer: 'https://limehd.tv/',
  //   Origin: 'https://limehd.tv',
  //   Connection: 'keep-alive'
  // }
});

test("visit limehd.tv website and check errors in console with logger", async ({ page }) => {

  logger(page)

  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://limehd.tv/channel/redline');
  expect(response.status()).toBeLessThan(400);
  //await page.getByText('Детский Мир').click();
  // try {
  //   await page.locator('.svg.play__button').click({ timeout: 2000 });
  // } catch (error) {
  //   console.log('"Play" buttom is not visible')
  // }
  // await page.waitForTimeout(10000)
  // try {
  //   await page.locator('#close').click();
  // } catch (error) {
  //   console.log('"Close" buttom is not visible')
  // }

  await page.waitForResponse(resp => resp.url().includes(broadcaster), { timeout: 50000 })

  await page.waitForTimeout(5000)
  //await page.screenshot({ path: "screenshots/limehd.tv.png" });
})
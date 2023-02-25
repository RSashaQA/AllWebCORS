const { test, expect } = require("@playwright/test");
const { teapot_error, media_error, videojs_error, playlist_error, cors_error, broadcaster } = require("../constants")
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

test("visit Lime website and check errors in console with logger", async ({ page }) => {

  page.on("console", (msg) => {
    if (
      (msg.type() == 'error' && msg.text().toLowerCase().includes(teapot_error)) ||
      (msg.type() == 'error' && msg.text().toLowerCase().includes(media_error)) ||
      (msg.type() == 'error' && msg.text().toLowerCase().includes(videojs_error)) ||
      (msg.type() == 'error' && msg.text().toLowerCase().includes(playlist_error)) ||
      (msg.type() == 'error' && msg.text().toLowerCase().includes(cors_error) && msg.text().toLowerCase().includes(broadcaster))
    ) {
      throw new Error(msg.text());
    }
  })

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
  await page.screenshot({ path: "screenshots/limehd.tv.png" });
})
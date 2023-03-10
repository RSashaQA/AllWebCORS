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

// test("visit limehd.tv/movies and check errors", async ({ page }) => {

//   //logger(page)

//   const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://limehd.tv/movies');
//   expect(response.status()).toBeLessThan(400);

//   await expect(page).toHaveURL(/.*movies/)

//   await page.waitForSelector('.slider__list')
// })

// test("visit limehd.tv/, login, then try to by subscribes with yoomoney", async ({ page }) => {

//   //logger(page)

//   const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://limehd.tv/login');
//   expect(response.status()).toBeLessThan(400);

//   await page.getByPlaceholder('Введите e-mail').fill('228@322.com');

//   await page.getByPlaceholder('Введите пароль').fill('qqqqqq');

//   await page.getByRole("button", { name: 'Войти' }).click();

//   const login_response = await page.waitForResponse('https://limehd.tv/api/v4/login');
//   expect(login_response.status()).toBe(200);

//   await page.getByRole('banner').getByRole('link', { name: 'Подписки' }).click();

//   await page.getByRole('link', { name: 'ТВ Детский 79 Р/Мес' }).click();

//   const t0 = Date.now();

//   // page.on('request', req => { if (req.url().includes('yoomoney')) { console.log(`> ${Date.now() - t0} request start: ${req.url()}`) } })
//   // page.on('response', req => { if (req.url().includes('yoomoney')) { console.log(`< ${Date.now() - t0} response: ${req.url()}`) } })
//   // page.on('requestfinished', req => { if (req.url().includes('yoomoney')) { console.log(`. ${Date.now() - t0} request finished: ${req.url()}`) } })
//   page.on('requestfailed', req => {
//     if (req.url().includes('https://yoomoney.ru')) {
//       throw new Error(`E request failed: ${req.url()}`)
//     }
//   })

//   await page.getByRole('button', { name: 'Оформить подписку' }).click();

//   await page.waitForTimeout(5000);
// })
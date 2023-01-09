import pkg from "lodash";
const { random } = pkg;
const isLoggedIn = async (page, email) => {
  if ((await page.url()).includes("mail.google.com/mail/u/")) {
    return "loggedIn";
  }

  const signOutBtn = await page.waitForSelector(`a[aria-label*='${email}']`);

  if (signOutBtn) {
    return "loggedIn";
  }

  return "";
};

const checkSelectorPage = async (page, selector) => {
  const element = await page.waitForSelector(selector, {
    state: "visible",
  });
  if (!element) {
    return "";
  }
  return selector;
};

export const loginGoogle = async (
  browser,
  page,
  { gmail, password, recoveryEmail }
) => {
  if (!(gmail && password)) {
    return {
      success: false,
      reason: `No ${gmail ? "gmail " : ""}${password ? "password " : ""}`,
    };
  }
  try {
    await page.goto("https://www.google.com/intl/vi/gmail/about/", {
      waitUntil: "load",
    });

    const loginBtnSelector = 'a[data-action="sign in"]';

    const emailInputSelector =
      'input#identifierId[type="email"][name="identifier"]';
    // const emailNextBtnSelector =
    //   "button[jscontroller]:not([aria-haspopup]) > span:not([aria-hidden])";
    const dataIdentifierSelector = "div[data-identifier]";
    const passwordInputSelector = 'input[type="password"]';
    // const passwordNextBtnSelector =
    //   "button[jscontroller]:not([aria-haspopup]) > span:not([aria-hidden])";

    const protectAccountImageSelector =
      'img[src*="//www.gstatic.com/identity/boq/accounthealthinterstitialsui/images/dont_get_locked_out.png"]';
    const confirmProtectAccountSelector = 'div[role="button"][jsname="UjXomb"]';

    const notNowSelector = 'div[role="listitem"]';
    const notNowBtnSelector = "button"; // first element

    const alertSelector =
      "div[role='alertdialog'] div[role='button'][aria-label]";

    const googleClassInviteSelector = "table[role='grid'] tr:nth-child(1)";
    const newAccountSelector = "form#tos_form";
    let tries = 0;
    let previousStep = "";

    do {
      tries += 1;
      const currentURL = await page.url();
      // console.log('currentURL: ', currentURL)
      const promises = [
        checkSelectorPage(page, loginBtnSelector),
        checkSelectorPage(page, emailInputSelector),
        checkSelectorPage(page, passwordInputSelector),
        checkSelectorPage(page, dataIdentifierSelector),
        checkSelectorPage(page, newAccountSelector),
        checkSelectorPage(page, protectAccountImageSelector),
        checkSelectorPage(page, notNowSelector),
        checkSelectorPage(page, alertSelector),
        isLoggedIn(page, gmail.trim().toLowerCase()),
      ];

      await page.waitForTimeout(random(5, 30) * 100);

      const result = await Promise.any(promises);
      console.log("result: ", await result);
      if (result == previousStep) {
        await page.waitForTimeout(random(5, 50) * 100);
        continue;
      }
      previousStep = result;

      switch (result) {
        case loginBtnSelector:
          await page.locator(loginBtnSelector).click();
          break;

        case emailInputSelector:
          await page.locator(emailInputSelector).fill(gmail.trim());
          await Promise.any([
            page.locator("#identifierNext > div > button").click({
              force: true,
              delay: 60,
            }),
            page.locator("input#next").click({
              force: true,
              delay: 60,
            }),
            page.locator("input#submit").click({
              force: true,
              delay: 60,
            }),
            page
              .locator("div[data-primary-action-label] button")
              .first()
              .click({
                force: true,
                delay: 60,
              }),
            //
          ]);
          break;

        case dataIdentifierSelector:
          const selector = `div[data-identifier="${gmail.toLowerCase()}"]`;
          await page.locator(selector).click();
          await page.waitForTimeout(random(1, 2) * 1000);
          break;

        case passwordInputSelector:
          await page.locator(passwordInputSelector).fill(password.trim());
          await Promise.any([
            page.locator("#passwordNext > div > button").click({
              force: true,
              delay: 60,
            }),
            page.locator("input#submit").click({
              force: true,
              delay: 60,
            }),
            page
              .locator("div[data-primary-action-label] button")
              .first()
              .click({
                force: true,
                delay: 60,
              }),
            //
          ]);
          await page.waitForTimeout(random(3, 5) * 1000);
          break;

        case notNowSelector:
          await page.locator(notNowBtnSelector).click();
          await page.waitForTimeout(random(0, 3) * 1000);
          break;

        case protectAccountImageSelector:
          await page.waitForTimeout(random(0, 3) * 1000);
          await page.locator(confirmProtectAccountSelector).click();
          break;

        case newAccountSelector:
          await page.locator("input#confirm").click({ delay: 55 });
          await page.waitForTimeout(random(0, 1) * 200);
          break;

        case alertSelector:
          await page.locator(alertSelector).click();
          await page.waitForTimeout(random(1, 2) * 1000);
          break;

        case "loggedIn":
          // await page.locator(googleClassInviteSelector).click();
          // const urlNow = await page.url();
          // await page.waitForFunction(
          //   (urlNow) => window.location.href !== urlNow,
          //   {},
          //   urlNow
          // );
          // const isDialog = await page.$(
          //   "div[role='dialog'] button[aria-label='Đóng']"
          // );
          // if (isDialog) {
          //   await page
          //     .locator("div[role='dialog'] button[aria-label='Đóng']")
          //     .click();
          // }
          // await page.waitForTimeout(random(1, 2) * 1000);
          // const [newPage] = await Promise.all([
          //   browser.waitForEvent("page"),
          //   page
          //     .getByRole("link", { name: "Tham gia" })
          //     .click()
          //     .catch((e) => log.error(e)),
          // ]);

          // if (newPage) {
          //   await newPage.waitForTimeout(random(5, 30) * 100);
          //   await newPage.bringToFront();
          //   const newURL = await newPage.url();
          //   console.log(
          //     "🚀 ~ file: loginGoogle.js:172 ~ loginGoogle ~ newURL",
          //     newURL
          //   );
          //   if (newURL.includes("classroom.google.com")) {
          //     await newPage.waitForTimeout(random(1, 2) * 1000);
          //     return { success: true, reason: "" };
          //   }
          // }
          return { success: true, reason: "" };

        default:
          break;
      }

      if (tries > 10) {
        return { success: false, reason: "Max tries reach" };
      }
      await page.waitForFunction(
        (currentURL) => window.location.href !== currentURL,
        {},
        currentURL
      );
    } while (true);
  } catch (error) {
    console.error(`Error when google: ${error.message}`);
    return { success: false, reason: error.message };
  }
};

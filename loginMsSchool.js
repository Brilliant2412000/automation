import pkg from "lodash";
const { random } = pkg;
const isLoggedIn = async (page) => {
  const userProfile = await page.waitForSelector(
    "img[src*='https://mschool.vn/wp-content/uploads/']",
    {
      state: "visible",
    }
  );

  if (userProfile) {
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
// mschool.vn wants additional access to your Google Account
const chooseAccessInformation = async (page) => {
  const inputCheckboxSelector = "input[type='checkbox']";
  const items = await page.$$(inputCheckboxSelector);
  for (const item of items) {
    const isChecked = (await item.isChecked()) || false;
    if (!isChecked) {
      await page.waitForTimeout(random(5, 30) * 100);
      await item
        .click({
          delay: 60,
        })
        .catch((e) => log.error(e));
    }
  }
};
const checkIsLoginPage = async (page) => {
  const accessToken = await page.evaluate(() =>
    localStorage.getItem("accessToken")
  );
  if (!accessToken) {
    return "loginPage";
  } else {
    return "loggedIn";
  }
};

const selectAccount = async (page, gmail) => {
  const selector = `div[data-identifier="${gmail.toLowerCase()}"]`;
  try {
    await page.$(selector).click({ timeout: 10000 });
  } catch (error) {
    console.log("Error when select account: No account match");
    await page.$("text=Use another account").click({ delay: 55 });
  }
  return "accountSelected";
};
export const loginClassroomMSchool = async (
  browser,
  page,
  { gmail, password }
) => {
  if (!(gmail && password)) {
    return {
      success: false,
      reason: `No ${gmail ? "gmail " : ""}${password ? "password " : ""}`,
    };
  }
  try {
    await page.goto("https://classroom.mschool.vn", {
      waitUntil: "load",
    });

    const loginBtnSelector = "a.mb-4 button";

    const emailInputSelector =
      'input#identifierId[type="email"][name="identifier"]';
    const accountSelector = `div[data-identifier="${gmail.toLowerCase()}"]`;
    const chooseAccessSelector =
      "text=mschool.vn muốn truy cập vào Tài khoản Google của bạn";
    const acceptAccessSelector = "text=mschool.vn đã có một số quyền truy cập";
    const passwordInputSelector = 'input[type="password"]';
    const newAccountSelector = "text=Chào mừng bạn đến với tài khoản mới";
    const phoneRequireSelector = "input#phoneNumberId";
    let tries = 0;
    let previousStep = "";
    do {
      tries += 1;
      const currentURL = await page.url();
      // console.log('currentURL: ', currentURL)
      const promises = [
        checkSelectorPage(page, accountSelector),
        checkSelectorPage(page, chooseAccessSelector),
        checkSelectorPage(page, acceptAccessSelector),
        checkSelectorPage(page, newAccountSelector),
        checkSelectorPage(page, passwordInputSelector),
        checkSelectorPage(page, phoneRequireSelector),
        checkSelectorPage(page, emailInputSelector),
        checkIsLoginPage(page),
        isLoggedIn(page),
      ];

      await page.waitForTimeout(random(5, 30) * 100);

      const result = await Promise.any(promises);
      console.log(
        "🚀 ~ file: loginMsSchool.js:93 ~ loginClassroomMSchool ~ result",
        result
      );
      // console.log('result: ', await result)
      if (result == previousStep) {
        await page.waitForTimeout(random(5, 50) * 100);
        continue;
      }
      previousStep = result;

      switch (result) {
        case "loginPage":
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

        case accountSelector:
          await page.locator(accountSelector).click();
          await page.waitForTimeout(random(1, 2) * 1000);
          break;

        case chooseAccessSelector:
          await chooseAccessInformation(page);
          await page
            .getByRole("button", { name: "Cho phép" })
            .click({ delay: 55 });
          await page.waitForTimeout(random(3, 5) * 1000);
          break;

        case acceptAccessSelector:
          await page.locator("text=Cho phép").click({ delay: 55 });
          await page.waitForTimeout(random(3, 5) * 1000);
          break;

        case phoneRequireSelector:
          return { success: false, reason: "need phone" };

        case newAccountSelector:
          await page.locator("input#confirm").click({ delay: 55 });
          await page.waitForTimeout(random(0, 1) * 200);
          break;

        case "loggedIn":
          const accessToken = await page.evaluate(() =>
            localStorage.getItem("accessToken")
          );
          return { success: true, reason: "", accessToken, gmail };

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

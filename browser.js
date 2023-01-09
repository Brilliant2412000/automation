import path from "path";
import { fileURLToPath } from "url";
import { spoofing } from "./fingerprint.js";
import { addStealth } from "./stealth.js";
import { chromium } from "playwright";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const CHROMIUM_WIN_PATH = path.join(
  __dirname,
  "./assets/bin/chrome-win/chrome.exe"
);
const absolutePathProfile = path.join(__dirname, "./profile/");

export const initialize = async (headless, userAgents, profile, index) => {
  // eslint-disable-next-line
  profile.userAgent = profile.userAgent
    ? profile.userAgent
    : userAgents && userAgents.length > 0
    ? userAgents[randomNumber(0, userAgents.length)]
    : "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.50";
  const screenWidth = 1080;
  const screenHeight = 1920;
  const row = Math.floor(index / 10);
  const column = index % 10;
  const options = {
    headless,
    ignoreHTTPSErrors: true,
    viewport: null,
    locale: "en-US",
    ignoreDefaultArgs: [
      "--enable-automation",
      "--disable-extensions",
      "--disable-component-extensions-with-background-pages",
    ],
    chromiumSandbox: false,
    userAgent: profile.userAgent,
    executablePath: CHROMIUM_WIN_PATH,
    args: [
      "--start-maximized",
      "--enable-webgl",
      "--use-gl=desktop",
      "--disable-dev-shm-usage",
      "--shm-size=4gb",
      `--window-size=${Math.round(screenWidth / 1.2)},${Math.round(
        screenHeight / 2
      )}`,
      `--window-position=${column * Math.round(screenWidth / 20)},${
        row * Math.round(screenHeight / 20)
      }`,
    ],
  };
  try {
    const context = await chromium.launchPersistentContext(
      path.join(`${absolutePathProfile}`, `${profile.name}`),
      options
    );

    await addStealth(context).catch((e) =>
      console.error(`error add stealth ${e}`)
    );

    if (!profile.fingerprintSeed) {
      profile.fingerprintSeed = `${profile.name
        ?.toString()
        .replace(/[^\w\s]/gi, "")
        .substring(0, 6)
        .toLowerCase()}_${Math.round(Math.random() * 1000)}`;
    }
    context.setDefaultNavigationTimeout(0);
    await context
      .addInitScript(spoofing, profile.fingerprintSeed)
      .catch((e) => console.error(`error evaluate ${e}`));

    return context;
  } catch (error) {
    console.error("Error when init browser: ", error);
    return undefined;
  }
};

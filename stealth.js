import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RESOURCES_PATH = path.join(__dirname, "./assets");
const scriptsContent = {};
export const addStealth = async (browserContext) => {
  // log.log('Vao ham add Stealth');
  const fileNames = [
    "js-stealth/utils.txt",
    "js-stealth/generate.magic.arrays.txt",
    "js-stealth/chrome.app.txt",
    "js-stealth/chrome.csi.txt",
    "js-stealth/chrome.hairline.txt",
    "js-stealth/chrome.load.times.txt",
    "js-stealth/chrome.runtime.txt",
    "js-stealth/iframe.contentWindow.txt",
    "js-stealth/media.codecs.txt",
    "js-stealth/navigator.hardwareConcurrency.txt",
    "js-stealth/navigator.languages.txt",
    "js-stealth/navigator.permissions.txt",
    "js-stealth/navigator.platform.txt",
    "js-stealth/navigator.plugins.txt",
    "js-stealth/navigator.userAgent.txt",
    "js-stealth/navigator.vendor.txt",
    "webdriver",
    "js-stealth/window.outerdimensions.txt",
    "js-stealth/webgl.vendor.txt",
  ];

  await Promise.all(
    fileNames.map(async (filename) => {
      let script = "";
      if (filename === "webdriver") {
        script = "delete Object.getPrototypeOf(navigator).webdriver";
      } else {
        scriptsContent[filename] =
          scriptsContent[filename] ||
          (await fs.promises.readFile(
            path.resolve(RESOURCES_PATH, filename),
            "utf-8"
          ));
        script = scriptsContent[filename];
        // eslint-disable-next-line
      }
      await browserContext.addInitScript(script);
    })
  );

  return browserContext;
};

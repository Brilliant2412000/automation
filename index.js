import fs from "fs";
import { parse } from "csv-parse";
import { initialize } from "./browser.js";
import path from "path";
import { loginClassroomMSchool } from "./loginMsSchool.js";
import pkg from "lodash";
import { acceptGoogleClassroom, loginGoogle } from "./loginGoogle.js";
const { chunk, random } = pkg;
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
process.setMaxListeners(0);
const formatRow = (row) => {
  const arr = row[0].split(",");
  const name = arr[0] + "_" + arr[1];
  const gmail = arr[2];
  const password = arr[3];
  return {
    name,
    gmail,
    password,
  };
};
const wait = (ms) => {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms);
  });
};
async function main() {
  const csvData = [];
  fs.createReadStream("./Test_500.csv")
    .pipe(parse({ delimiter: ":", from_line: 2 }))
    .on("data", function (csvrow) {
      const formatData = formatRow(csvrow);
      //do something with csvrow
      csvData.push(formatData);
    })
    .on("end", async function () {
      const fileExists = async (path) =>
        !!(await fs.promises.stat(path).catch((e) => false));
      // const threadsRun = 250;
      // const itemsGroups = chunk(csvData, threadsRun);
      // const runningGroups = [];
      // for (let i = 0; i < threadsRun; i += 1) {
      //   runningGroups.push([]);
      // }
      // for (const items of itemsGroups) {
      //   for (let i = 0; i < threadsRun; i += 1) {
      //     if (items[i]) {
      //       runningGroups[i].push(items[i]);
      //     }
      //   }
      // }

      // for (const group of runningGroups) {
      //   await Promise.all(
      //     group.map(async (user, index) => {
      //       const browser = await initialize(false, "", user, index);
      //       const page = await browser.newPage();
      //       const res = await loginClassroomMSchool(browser, page, user);
      //       if (res && res.success) {
      //         const filePath = path.join(__dirname, `./data/${user.name}.json`);
      //         const isExist = await fileExists(filePath);
      //         console.log(
      //           "🚀 ~ file: index.js:84 ~ group.map ~ isExist",
      //           isExist
      //         );
      //         if (!isExist) {
      //           await fs.promises.writeFile(
      //             filePath,
      //             JSON.stringify({
      //               accessToken: res.accessToken,
      //               email: res.gmail,
      //             }),
      //             {
      //               encoding: "utf8",
      //             }
      //           );
      //         }
      //         await browser.close();
      //       } else {
      //         await browser.close();
      //       }
      //       await wait(200);
      //     })
      //   );
      // }
      // chay cac account con lai
      const otherData = [];
      for (const user of csvData) {
        const filePath = path.join(__dirname, `./data/${user.name}.json`);
        const isExist = await fileExists(filePath);
        if (!isExist) {
          otherData.push(user);
        }
      }
      if (otherData && otherData.length > 0) {
        console.log(otherData.length)
        const threadsRun = 1;
        const itemsGroups = chunk(otherData, threadsRun);
        const runningGroups = [];
        for (let i = 0; i < threadsRun; i += 1) {
          runningGroups.push([]);
        }
        for (const items of itemsGroups) {
          for (let i = 0; i < threadsRun; i += 1) {
            if (items[i]) {
              runningGroups[i].push(items[i]);
            }
          }
        }

        for (const group of runningGroups) {
          await Promise.all(
            group.map(async (user, index) => {
              const browser = await initialize(false, "", user, index);
              const page = await browser.newPage();
              const res = await loginClassroomMSchool(browser, page, user);
              if (res && res.success) {
                const filePath = path.join(
                  __dirname,
                  `./data/${user.name}.json`
                );
                const isExist = await fileExists(filePath);
                console.log(
                  "🚀 ~ file: index.js:84 ~ group.map ~ isExist",
                  isExist
                );
                if (!isExist) {
                  await fs.promises.writeFile(
                    filePath,
                    JSON.stringify({
                      accessToken: res.accessToken,
                      email: res.gmail,
                    }),
                    {
                      encoding: "utf8",
                    }
                  );
                }
                await browser.close();
              } else {
                await browser.close();
              }
              await wait(200);
            })
          );
        }
      }
    });
}

main().then().catch();

import fs from "fs";
import { parse } from "csv-parse";
import { initialize } from "./browser.js";
import { loginClassroomMSchool } from "./loginMsSchool.js";
import pkg from "lodash";
import { acceptGoogleClassroom, loginGoogle } from "./loginGoogle.js";
const { chunk, random } = pkg;
process.setMaxListeners(0);
const formatRow = (row) => {
  const arr = row[0].split(",");
  const name = arr[0] + " " + arr[1];
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
  fs.createReadStream("./Test.csv")
    .pipe(parse({ delimiter: ":", from_line: 2 }))
    .on("data", function (csvrow) {
      const formatData = formatRow(csvrow);
      //do something with csvrow
      csvData.push(formatData);
    })
    .on("end", async function () {
      const threadsRun = 500;
      const itemsGroups = chunk(csvData, threadsRun);
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
      //do something with csvData
      const user = {
        gmail: "Test809@mschool.vn",
        password: "mschool.vn",
        name: "Test809 mschool",
      };
      const browser = await initialize(false, "", user, 0);
      const page = await browser.newPage();
      const result = await loginGoogle(browser, page, user);
      if (result && result.success) {
        console.log("Yo");
        await acceptGoogleClassroom(browser, page);
      }

      // for (const user of runningGroups[0]) {
      //   const browser = await initialize(false, "", user,0);
      //   const page = await browser.newPage();
      //   await loginGoogle(browser,page,user)
      // }
      // if (browserUser && browserUser.length > 0) {
      //   console.log("🚀 ~ file: index.js:62 ~ browserUser", browserUser.length);
      //   await Promise.all(
      //     browserUser.map(async (data) => {
      //       console.log("Login di");
      //       await loginClassroomMSchool(data.page, data.user);
      //     })
      //   );
      // }
      // for (const group of runningGroups) {
      //   await Promise.all(
      //     group.map(async (user, index) => {
      //       const browser = await initialize(false, "", user, index);
      //       const page = await browser.newPage();
      //       const res = await loginGoogle(browser,page,user)
      //       if (res && res.success) {
      //         await browser.close();
      //       }
      //       await wait(200);
      //     })
      //   );
      // }
      // await Promise.all(
      //   runningGroups.map(async (group, index) => {
      //     await wait(index * 200);
      //     for (const user of group) {
      //       const browser = await initialize(false, "", user, index);
      //       const page = await browser.newPage();
      //       await loginClassroomMSchool(page, user);
      //       await wait(200);
      //     }
      //   })
      // );
    });
  // const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage));
  // const accessToken = localStorage.getItem("accessToken")
  // refreshToken
}

main().then().catch();

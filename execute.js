const { exec } = require("child_process");
const fs = require("fs");

function runCode(language, code, input) {
  return new Promise((resolve, reject) => {
    if (language === "javascript") {
      fs.writeFileSync("temp.js", code);

      const process = exec("node temp.js");

      if (input) {
        process.stdin.write(input);
        process.stdin.end();
      }

      process.stdout.on("data", (data) => {
        resolve(data);
      });

      process.stderr.on("data", (data) => {
        reject(data);
      });
    } else {
      reject("Language not supported");
    }
  });
}

module.exports = runCode;
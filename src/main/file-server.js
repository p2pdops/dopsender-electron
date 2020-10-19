const fs = require("fs");
const progress = require("progress-stream");
const http = require("http");

const humanizeTime = (millis) => {
  let seconds = millis;
  //   seconds /= 1000;
  let out = "";
  const hr = Math.ceil(seconds / (60 * 60));
  seconds %= 60 * 60;
  const min = Math.ceil(seconds / 60);
  seconds %= 60;
  seconds = Math.ceil(seconds);
  if (hr > 0) {
    out += `${hr} Hr${hr === 1 ? " " : "s "}`;
  }
  if (min > 0) {
    out += `${min} M `;
  }
  if (seconds > 0) {
    out += `${seconds} s`;
  }

  return out;
};

module.exports = function createFileServer(windowWebContents) {
  http
    .createServer((request, response) => {
      console.log("Request:");

      // if (os.platform() === "win32")
      //     if (request.url.startsWith("/"))
      request.url = request.url.substring(1);

      let filePath = request.url;

      filePath = decodeURI(filePath);

      console.log("filepath:", filePath);

      const fileDetails = fs.statSync(filePath);

      if (fileDetails.isFile) {
        response.setHeader("Content-Length", fileDetails.size);

        const stream = fs.createReadStream(filePath, {
          highWaterMark: 64 * 1024,
        });

        const str = progress({
          length: fileDetails.size,
          time: 1000 /* ms */,
        });

        str.on("progress", function (progress) {
          const { percentage, eta } = progress;
          console.log(
            `Sending:${Math.ceil(percentage)}%,done, Left: ${humanizeTime(eta)}`
          );
          windowWebContents.send("transfer/progress", {
            type: "send",
            left: eta,
            update: "progress",
            filePath: filePath,
            percentage: Math.ceil(percentage),
          });
        });

        response.on("pipe", (e) => {
          console.log("upload started:", filePath);
          windowWebContents.send("transfer/progress", {
            left: 0,
            type: "send",
            percentage: 0,
            update: "start",
            filePath: filePath,
          });
        });

        response.on("finish", (e) => {
          console.log("upload finish:", filePath);
          windowWebContents.send("transfer/progress", {
            left: 0,
            type: "send",
            percentage: 0,
            update: "finish",
            filePath: filePath,
          });
        });

        response.on("error", (e) => {
          console.log("error", e);
          windowWebContents.send("transfer/progress", {
            left: 0,
            type: "send",
            percentage: 0,
            update: "error",
            error: e.message,
            filePath: filePath,
          });
        });

        stream.pipe(str).pipe(response);
      }
    })
    .listen(8126, "0.0.0.0");
};

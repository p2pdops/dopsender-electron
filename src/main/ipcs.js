const { ipcMain } = require("electron");

const evilscan = require("evilscan");
const network = require("network");

const fs = require("fs");
const path = require("path");

const getActiveNetwork = () =>
  new Promise((resolve, reject) => {
    network.get_active_interface((err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });

const listenIpcs = () => {
  ipcMain.on("ondragstart", (event, filePath) => {
    event.sender.startDrag({
      file: filePath,
    });
  });

  ipcMain.on("on-arp-scan", async (event) => {
    console.log(event);
    const network = await getActiveNetwork();
  });

  ipcMain.on("get_file_data", (event, filePath) => {
    const fileName = path.basename(filePath);
    const { size } = fs.statSync(filePath);
    event.sender.send("return_file_data", {
      path: filePath,
      name: fileName,
      status: 0,
      type: 0,
      size,
    });
  });
};

module.exports = listenIpcs;

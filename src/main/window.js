const path = require("path");
const url = require("url");

const { app, BrowserWindow, ipcMain, screen } = require("electron");
// const { download } = require("electron-dl");
const DownloadManager = require("./download");

const createFileServer = require("./file-server");

let mainWindow;

const openDopsender = () => {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../../build/index.html"),
      protocol: "file:",
      slashes: true,
    });

  DownloadManager.register({
    downloadFolder: app.getPath("downloads") + "/Dopsender/",
  });

  const createMainWindow = async () => {
    const { width } = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
      width: width / 4,
      minWidth: 320,
      minHeight: 573,

      darkTheme: false,
      thickFrame: false,
      // frame: false,
      resizable: true,
      webPreferences: {
        nodeIntegration: true,
        // devTools: false
      },
    });
    mainWindow.setAspectRatio(0.5625);
    mainWindow.setBackgroundColor("#ffffff");
    mainWindow.removeMenu();
    await mainWindow.loadURL(startUrl);
    mainWindow.webContents.openDevTools();
    mainWindow.on("closed", function () {
      mainWindow = null;
    });

    createFileServer(mainWindow.webContents);

    ipcMain.on("receive_file", async (event, { url, path }) => {
      let sentReceiving = false,
        sentReceived = false;
      DownloadManager.download(
        {
          url,
          onProgress: (progress, item) => {
            console.log("receive-progress", progress, item);

            if (!sentReceiving) {
              sentReceiving = true;
              event.sender.send("transfer/progress", {
                left: 0,
                type: "receive",
                percentage: 0,
                update: "start",
                filePath: path,
              });
            } else {
              event.sender.send("transfer/progress", {
                type: "receive",
                left: progress.remaining,
                update: "progress",
                filePath: path,
                percentage: progress.progress,
              });
            }
          },
        },
        function (error, info) {
          if (error) {
            console.log(error);
            return;
          }
          if (!sentReceived) {
            sentReceived = true;
            event.sender.send("transfer/progress", {
              left: 0,
              type: "receive",
              percentage: 0,
              update: "finish",
              filePath: path,
            });
          }
          console.log("DONE: " + info.url);
        }
      );
    });
  };

  app.on("ready", createMainWindow);

  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", createMainWindow);
};

module.exports = openDopsender;

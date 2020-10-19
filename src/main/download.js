const path = require("path");
const { BrowserWindow, net, session, app } = require("electron");
const fs = require("fs");

let downloadFolder = app.getPath("downloads");
let lastWindowCreated;

const queue = [];

const _popQueueItem = (url) => {
  let queueItem = queue.find((item) => item.url === url);
  queue.splice(queue.indexOf(queueItem), 1);
  return queueItem;
};

const _bytesToSize = (bytes, decimals) => {
  if (bytes === 0) return "0 Bytes";
  var k = 1000,
    dm = decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const _convertTime = (input, separator) => {
  var pad = function (input) {
    return input < 10 ? "0" + input : input;
  };
  return [
    pad(Math.floor(input / 3600)),
    pad(Math.floor((input % 3600) / 60)),
    pad(Math.floor(input % 60)),
  ].join(typeof separator !== "undefined" ? separator : ":");
};

function _registerListener(win, opts = {}) {
  lastWindowCreated = win;
  downloadFolder = opts.downloadFolder || downloadFolder;

  const listener = (e, item) => {
    const itemUrl = decodeURIComponent(item.getURLChain()[0] || item.getURL());
    const itemFilename = decodeURIComponent(item.getFilename());

    let queueItem = _popQueueItem(itemUrl);
    let ReceivedBytesArr = [];

    if (queueItem) {
      // Resuming an interrupted download
      if (item.getState() === "interrupted") {
        item.resume();
      }

      const folder = queueItem.downloadFolder || downloadFolder;
      const filePath = path.join(folder, queueItem.path, itemFilename);

      const totalBytes = item.getTotalBytes();
      let speedValue = 0;
      let receivedBytes;
      let PreviousReceivedBytes;

      item.setSavePath(filePath);

      item.on("updated", () => {
        receivedBytes = item.getReceivedBytes();
        ReceivedBytesArr.push(receivedBytes);
        if (ReceivedBytesArr.length >= 2) {
          PreviousReceivedBytes = ReceivedBytesArr.shift();
          speedValue =
            Math.max(PreviousReceivedBytes, ReceivedBytesArr[0]) -
            Math.min(PreviousReceivedBytes, ReceivedBytesArr[0]);
        }
        const progress = {
          progress: Math.floor((receivedBytes * 100) / totalBytes),
          remaining: Math.floor(
            (totalBytes - receivedBytes) / (2 * speedValue)
          ),
        };

        queueItem.onProgress(progress, item);
      });

      item.on("done", (e, state) => {
        let finishedDownloadCallback = queueItem.callback || function () {};

        if (!win.isDestroyed()) {
          win.setProgressBar(-1);
        }

        if (state === "interrupted") {
          const message = `The download of ${item.getFilename()} was interrupted`;

          finishedDownloadCallback(new Error(message), {
            url: item.getURL(),
            filePath,
          });
        } else if (state === "completed") {
          if (process.platform === "darwin") {
            app.dock.downloadFinished(filePath);
          }

          // TODO: remove this listener, and/or the listener that attach this listener to newly created windows
          // if (opts.unregisterWhenDone) {
          //     webContents.session.removeListener('will-download', listener);
          // }

          finishedDownloadCallback(null, { url: item.getURL(), filePath });
        }
      });
    }
  };

  win.webContents.session.on("will-download", listener);
}

const register = (opts = {}) => {
  app.on("browser-window-created", (e, win) => {
    _registerListener(win, opts);
  });
};

const download = (options, callback) => {
  let win = BrowserWindow.getFocusedWindow() || lastWindowCreated;
  options = { ...{ path: "" }, ...options };

  const request = net.request(options.url);

  const filename = decodeURIComponent(path.basename(options.url));
  const url = decodeURIComponent(options.url);

  const folder = options.downloadFolder || downloadFolder;
  const filePath = path.join(
    folder,
    options.path.toString(),
    filename.split(/[?#]/)[0]
  );

  if (options.headers) {
    options.headers.forEach((h) => {
      request.setHeader(h.name, h.value);
    });

    // Modify the user agent for all requests to the following urls.
    const filter = {
      urls: [options.url],
    };

    session.defaultSession.webRequest.onBeforeSendHeaders(
      filter,
      (details, callback) => {
        options.headers.forEach((h) => {
          details.requestHeaders[h.name] = h.value;
        });
        // details.requestHeaders['User-Agent'] = 'MyAgent'
        callback({ cancel: false, requestHeaders: details.requestHeaders });
      }
    );
  }

  request.on("error", function (error) {
    let finishedDownloadCallback = callback || function () {};

    const message = `The request for ${filename} was interrupted: ${error}`;

    finishedDownloadCallback(new Error(message), {
      url: options.url,
      filePath: filePath,
    });
  });

  request.on("response", function (response) {
    request.abort();

    queue.push({
      url: url,
      filename: filename,
      downloadFolder: options.downloadFolder,
      path: options.path.toString(),
      callback: callback,
      onProgress: options.onProgress,
    });

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);

      const fileOffset = stats.size;

      const serverFileSize = parseInt(response.headers["content-length"]);

      console.log(
        filename +
          " exists, verifying file size: (" +
          fileOffset +
          " / " +
          serverFileSize +
          " downloaded)"
      );

      // Check if size on disk is lower than server
      if (fileOffset < serverFileSize) {
        console.log("File needs re-downloaded as it was not completed");

        options = {
          path: filePath,
          urlChain: [options.url],
          offset: parseInt(fileOffset),
          length: serverFileSize,
          lastModified: response.headers["last-modified"],
        };

        win.webContents.session.createInterruptedDownload(options);
      } else {
        console.log(filename + " verified, no download needed");

        let finishedDownloadCallback = callback || function () {};

        finishedDownloadCallback(null, { url, filePath });
      }
    } else {
      console.log(filename + " does not exist, download it now");
      win.webContents.downloadURL(options.url);
    }
  });
  request.end();
};

module.exports = {
  register,
  download,
};

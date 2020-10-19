import {eventChannel} from "redux-saga";
import {all, call, put, select, take, takeLatest} from "redux-saga/effects";
import {DFile, RAction, StatusType, TransferProgress} from "../../index.d";
import {selectPeerIP} from "../main/main.selectors";
import {selectSocket} from "../network/network.selectors";
import {
  receiveFile,
  reqNextFile,
  selectFiles,
  setFilesStack,
  setUnSentStack,
  startChain,
  updateReceive,
  updateReceiveProgress,
  updateSend,
  updateSendProgress,
} from "./transfer.reducer";
import {selectFilesStack, selectUnSentStack} from "./transfer.selectors";

const {ipcRenderer} = window.require("electron");

export const getFileData = (path: string) =>
  new Promise<DFile>((resolve, _) => {
    ipcRenderer.send("get_file_data", path);
    ipcRenderer.on("return_file_data", (_, arg) =>
      resolve({...arg} as DFile)
    );
  });

const createIPCRenderChannel = () =>
  eventChannel((emit) => {
    ipcRenderer.on("transfer/progress", (_, progress) => {
      console.log("createIPCRenderChannel", progress);
      emit(progress);
    });
    return () => {
    };
  });

function* handleSelectFiles(payload: string[]) {
  console.log("handleSelectFiles", payload);

  const filesList = [...(yield select(selectFilesStack))];
  const unSentStack = [...(yield select(selectUnSentStack))];

  // console.log("handleSelectFiles", filesStack, unSentStack);

  let files: DFile[] = [];
  for (const filePath of payload) {
    yield files.push(yield getFileData(filePath));
  }

  yield console.log("files", files);

  for (let file of files) {
    const foundIndex = filesList.findIndex((it) => it.path === file.path);
    if (foundIndex === -1) {
      yield filesList.push(file);
      yield put(setFilesStack(filesList));
    }
  }

  const preUnSentLength = unSentStack.length;

  for (let file of files) {
    const foundIndex = unSentStack.findIndex((it) => it === file.path);
    if (foundIndex === -1) {
      // yield console.log("@unSentStack", unSentStack, filePath);
      yield unSentStack.push(file.path);
      yield put(setUnSentStack(unSentStack));
    }
  }

  if (preUnSentLength === 0) yield put(startChain());
}

function* startChainAsync(item: DFile) {
  console.log("startChainAsync", item);
  const socket = yield select(selectSocket);
  socket.emit(receiveFile.type, item);
}

function* receiveFileAsync(payload: DFile) {
  const filesStack = [...(yield select(selectFilesStack))];

  const ip = yield select(selectPeerIP);

  const rFile = payload;
  const url = `http://${ip}:9090/${rFile.path}`;
  console.log("onReceiveFile", url);

  yield filesStack.push(rFile);

  yield ipcRenderer.send("receive_file", {url, path: rFile.path});

  yield put(setFilesStack(filesStack));
}

function* updateFileToProcessing(path: string) {
  const filesList: DFile[] = [...(yield select(selectFilesStack))];
  const fileIndex = yield filesList.findIndex((file) => file.path === path);
  filesList[fileIndex] = {
    ...filesList[fileIndex],
    status: StatusType.PROCESSING,
  };
  yield put(setFilesStack([...filesList]));
}

function* updateFileToProcessed(path: string) {
  const filesList: DFile[] = [...(yield select(selectFilesStack))];
  const fileIndex = yield filesList.findIndex((file) => file.path === path);
  filesList[fileIndex] = {...filesList[fileIndex], status: StatusType.DONE};
  yield put(setFilesStack([...filesList]));
}

function* onFilesSelected() {
  yield takeLatest(selectFiles.type, function* (action: RAction) {
    yield handleSelectFiles(action.payload);
  });
}

function* onStartChain() {
  yield takeLatest(startChain.type, function* () {
    const unSentStack = yield select(selectUnSentStack);
    const fileStack: DFile[] = yield select(selectFilesStack);
    if (unSentStack.length > 0) {
      const itemIndex = fileStack.findIndex((it) => it.path === unSentStack[0]);
      if (itemIndex !== -1) {
        yield startChainAsync(fileStack[itemIndex]);
      }
    }
  });
}

function* onRequestNextFile() {
  yield takeLatest(reqNextFile.type, function* () {
    const unSentStack = [...(yield select(selectUnSentStack))];
    unSentStack.shift();
    yield put(setUnSentStack(unSentStack));

    const fileStack: DFile[] = yield select(selectFilesStack);
    if (unSentStack.length > 0) {
      const itemIndex = fileStack.findIndex((it) => it.path === unSentStack[0]);
      if (itemIndex !== -1) {
        yield startChainAsync(fileStack[itemIndex]);
      }
    }
  });
}

function* onReceiveFile() {
  yield takeLatest(receiveFile.type, function* (action: RAction) {
    yield receiveFileAsync(action.payload);
  });
}

function* onTransferProgress() {
  const socketChannel = yield call(createIPCRenderChannel);

  while (true) {
    try {
      const progress: TransferProgress = yield take(socketChannel);
      yield console.log("onTransferProgress", progress);
      if (progress.type === "send") {
        switch (progress.update) {
          case "start":
            // set file status to processing
            yield updateFileToProcessing(progress.filePath);
            yield put(
              updateSend({
                sending: true,
                sendFilePath: progress.filePath,
                sendFileName: progress.filePath.replace(/^.*[\\/]/, ""),
              })
            );
            break;
          case "progress":
            yield put(
              updateSendProgress({
                sendProgress: progress.percentage,
                sendTimeLeft: progress.left,
              })
            );

            break;
          case "finish":
            yield updateFileToProcessed(progress.filePath);
            // set file status to processed
            yield put(
              updateSend({
                sending: false,
                sendFilePath: null,
                sendFileName: null,
              })
            );
            yield put(
              updateSendProgress({
                sendProgress: 0,
                sendTimeLeft: 0,
              })
            );
            break;
        }
      } else {
        switch (progress.update) {
          case "start":
            yield updateFileToProcessing(progress.filePath);
            yield put(
              updateReceive({
                receiving: true,
                receiveFilePath: progress.filePath,
                receiveFileName: progress.filePath.replace(/^.*[\\/]/, ""),
              })
            );
            break;
          case "progress":
            yield put(
              updateReceiveProgress({
                receiveProgress: progress.percentage,
                receiveTimeLeft: progress.left,
              })
            );

            break;
          case "finish":
            yield updateFileToProcessed(progress.filePath);

            yield put(
              updateReceive({
                receiving: false,
                receiveFilePath: null,
                receiveFileName: null,
              })
            );
            yield put(
              updateReceiveProgress({
                receiveProgress: 0,
                receiveTimeLeft: 0,
              })
            );
            break;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default function* transferSagas() {
  yield all([
    call(onStartChain),
    call(onReceiveFile),
    call(onFilesSelected),
    call(onRequestNextFile),
    call(onTransferProgress),
  ]);
}

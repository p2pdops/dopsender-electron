import { eventChannel } from "redux-saga";
import { all, call, put, select, take, takeLatest } from "redux-saga/effects";
import io from "socket.io-client";
import { DFileType, RAction, StatusType } from "../../index.d";
import { connectPeer, disconnectPeer } from "../main/main.reducer";
import { selectMyIP, selectPeerIP } from "../main/main.selectors";
import { receiveFile, reqNextFile } from "../transfer/transfer.reducer";
import {
  emitToSocket,
  deviceConnected,
  setSocketObject,
  deviceDisConnected,
  connectToSocketServer,
  connectToRemoteSocketServer,
} from "./network.reducer";
import { selectSocket } from "./network.selectors";

const createSocketConnection = (ip: string) => io(`http://${ip}:4042`);

const createSocketChannel = (socket: SocketIOClient.Socket) =>
  eventChannel((emit) => {
    const eventHandler = (type: string) => (payload: any) =>
      emit({ type, payload });

    socket.on(deviceConnected.type, eventHandler(deviceConnected.type));

    socket.on(receiveFile.type, eventHandler(receiveFile.type));

    socket.on(reqNextFile.type, eventHandler(reqNextFile.type));

    socket.on(deviceDisConnected.type, eventHandler(deviceDisConnected.type));

    return () => {
      socket.close();
    };
  });

export function* onConnectToMySocketServer() {
  yield takeLatest(connectToSocketServer.type, function* () {
    const socket = yield call(createSocketConnection, yield select(selectMyIP));

    yield put(setSocketObject(socket));

    const socketChannel = yield call(createSocketChannel, socket);

    while (true) {
      try {
        const { type, payload } = yield take(socketChannel);
        switch (type) {
          case deviceConnected.type:
            yield put(connectPeer(payload));
            break;
          case reqNextFile.type:
            yield put(
              reqNextFile({
                payload,
              })
            );
            break;
          case deviceDisConnected.type:
            yield put(disconnectPeer(payload));
            break;
          case receiveFile.type:
            yield put(
              receiveFile({
                ...JSON.parse(payload),
                type: DFileType.RECEIVE_FILE,
                status: StatusType.WAITING,
              })
            );
            break;

          default:
        }
      } catch (err) {
        console.log("socket error: ", err);
      }
    }
  });
}

export function* onEmitToSocket() {
  yield takeLatest(emitToSocket.type, function* (payload) {
    const socket = yield select(selectSocket);
    socket.emit("sendEvent", payload);
  });
}

export function* onConnectToRemoteSocketServer() {
  yield takeLatest(connectToRemoteSocketServer.type, function* (
    {payload}: RAction
  ) {
    const socket = yield call(createSocketConnection, payload);
    yield put(setSocketObject(socket));

    const socketChannel = yield call(createSocketChannel, socket);

    socket.emit("sendEvent", payload);
  });
}

export default function* networkSagas() {
  yield all([
    call(onConnectToMySocketServer),
    call(onConnectToRemoteSocketServer),
    call(onEmitToSocket),
  ]);
}

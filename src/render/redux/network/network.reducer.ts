import { RAction } from "../..";

import { createAction, createReducer } from "@reduxjs/toolkit";

export const connectToSocketServer = createAction("action/startMobileSocket");

export const connectToRemoteSocketServer = createAction<string>(
  "action/connectRemoteSocket"
);

export const setSocketObject = createAction<SocketIOClient.Socket>(
  "action/setSocketObject"
);

export const deviceConnected = createAction("device_connected");
export const deviceDisConnected = createAction("device_disconnected");

export const emitToSocket = createAction("action/emitToSocket");

export const disConnectToSocketServer = createAction("action/stopMobileSocket");

interface NetworkState {
  socket: SocketIOClient.Socket | null;
}

const initialState = {
  socket: null,
};

const networkReducer = createReducer(initialState, {
  [setSocketObject.type]: (state: NetworkState, action: RAction) => ({
    ...state,
    socket: action.payload,
  }),
});

export default networkReducer;

import { createAction, createReducer } from "@reduxjs/toolkit";
import { disconnectPeer } from "../main/main.reducer";
import {
  DFile,
  TransferState,
  TransferSendingAction,
  TransferReceivingAction,
  TransferSendProgressAction,
  TransferReceiveProgressAction,
} from "../..";

export const selectFiles = createAction("select/selectFiles");
export const setFilesStack = createAction<DFile[]>("set/filesStack");
export const setUnSentStack = createAction<string[]>("set/unSentStack");

export const startChain = createAction("action/startChain");

export const receiveFile = createAction<any>("action/receiveFile");

export const reqNextFile = createAction<any>("action/reqNextFile");

export const updateSend = createAction<TransferSendingAction>(
  "set/updateSending"
);

export const updateSendProgress = createAction<TransferSendProgressAction>(
  "set/updateSendProgress"
);

export const updateReceive = createAction<TransferReceivingAction>(
  "set/updateReceive"
);

export const updateReceiveProgress = createAction<
  TransferReceiveProgressAction
>("set/updateReceiveProgress");

const initialState: TransferState = {
  filesList: [],
  unSentStack: [],

  sending: false,
  sendProgress: 0,
  sendTimeLeft: 0,
  sendFilePath: null,
  sendFileName: null,

  receiving: false,
  receiveProgress: 0,
  receiveTimeLeft: 0,
  receiveFilePath: null,
  receiveFileName: null,
};

const transferReducer = createReducer(initialState, {
  [setFilesStack.type]: (state, { payload }) => ({
    ...state,
    filesList: [...payload],
  }),
  [setUnSentStack.type]: (state, action) => ({
    ...state,
    unSentStack: [...action.payload],
  }),

  // sending
  [updateSend.type]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [updateSendProgress.type]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),

  // receiving
  [updateReceive.type]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [updateReceiveProgress.type]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),

  [disconnectPeer.type]: () => ({
    ...initialState,
  }),
});

export default transferReducer;

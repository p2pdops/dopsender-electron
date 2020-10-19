import { RAction } from "../..";

const { createAction, createReducer } = require("@reduxjs/toolkit");

// MY IP
export const fetchMyIp = createAction("action/fetchMyIp");
export const fetchMyIpSuccess = createAction("action/fetchMyIpSuccess");
export const fetchMyIpFailed = createAction("action/fetchMyIpFailed");

// PEER IP
export const connectPeer = createAction("action/connectPeer");
export const disconnectPeer = createAction("action/disconnectPeer");

export interface mainState {
  myIpAddress: string | null;
  myIpAddressError: any;
  peerIpAddress: string | null;
  connectedToPeer: boolean;
}

// INITIAL STATE
const initialState: mainState = {
  myIpAddress: null,
  myIpAddressError: null,
  peerIpAddress: null,
  connectedToPeer: false,
};

const mainReducer = createReducer(initialState, {
  // MY IP
  [fetchMyIpSuccess.type]: (state: mainState, { payload }: RAction) => ({
    ...state,
    myIpAddress: payload as string,
    myIpAddressError: null,
  }),
  [fetchMyIpFailed.type]: (state: mainState, { payload }: RAction) => ({
    ...state,
    myIpAddress: null,
    myIpAddressError: payload,
  }),

  // PEER IP
  [connectPeer]: (state: mainState, { payload }: RAction) => ({
    ...state,
    peerIpAddress: payload,
    connectedToPeer: true,
  }),
  [disconnectPeer]: (state: mainState, action: RAction) => ({
    ...state,
    peerIpAddress: null,
    connectedToPeer: false,
  }),
});

export default mainReducer;

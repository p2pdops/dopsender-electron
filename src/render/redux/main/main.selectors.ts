import { mainState } from "./main.reducer";

const { createSelector } = require("@reduxjs/toolkit");

/*
 * selectors
 */
export const selectMain = (state: any) => state.main;

export const selectMyIP = createSelector(
  [selectMain],
  (main: mainState) => main.myIpAddress
);

export const selectPeerIP = createSelector(
  [selectMain],
  (main: mainState) => main.peerIpAddress
);

export const selectIsConnectedToPeer = createSelector(
  [selectMain],
  (main: mainState) => main.connectedToPeer
);

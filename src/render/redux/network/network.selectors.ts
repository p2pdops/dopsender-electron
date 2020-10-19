import { createSelector } from "@reduxjs/toolkit";

export const selectNetwork = (state: any) => state.network;

export const selectSocket = createSelector(
  [selectNetwork],
  (network) => network.socket
);

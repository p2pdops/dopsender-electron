import { createSelector } from "@reduxjs/toolkit";
import { TransferState } from "../..";

export const selectTransfer = (state: any) => state.transfer;

export const selectFilesStack = createSelector(
  [selectTransfer],
  (transfer: TransferState) => transfer.filesList
);

export const selectUnSentStack = createSelector(
  [selectTransfer],
  (transfer: TransferState) => transfer.unSentStack
);

export const selectIsSending = createSelector(
  [selectTransfer],
  (transfer: TransferState) => transfer.sending
);

export const selectSendProgress = createSelector(
  [selectTransfer],
  (transfer: TransferState) => transfer.sendProgress
);

export const selectSendTimeLeft = createSelector(
  [selectTransfer],
  (transfer: TransferState) => transfer.sendTimeLeft
);

export const selectSendFilePath = createSelector(
  [selectTransfer],
  (transfer: TransferState) => transfer.sendFilePath
);

export const selectSendFileName = createSelector(
  [selectTransfer],
  (transfer: TransferState) => transfer.sendFileName
);

export const selectIsReceiving = createSelector(
  [selectTransfer],
  (transfer: TransferState) => transfer.receiving
);

export const selectReceiveProgress = createSelector(
  [selectTransfer],
  (transfer: TransferState) => transfer.receiveProgress
);

export const selectReceiveTimeLeft = createSelector(
  [selectTransfer],
  (transfer: TransferState) => transfer.receiveTimeLeft
);

export const selectReceiveFilePath = createSelector(
  [selectTransfer],
  (transfer: TransferState) => transfer.receiveFilePath
);

export const selectReceiveFileName = createSelector(
  [selectTransfer],
  (transfer: TransferState) => transfer.receiveFileName
);

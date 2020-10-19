/*
 * STATES
 */

export interface TransferState {
  filesList: DFile[];
  unSentStack: string[];

  sending: boolean;
  sendFilePath: string | null;
  sendFileName: string | null;
  sendProgress: number | 0;
  sendTimeLeft: number | 0;

  receiving: boolean;
  receiveFilePath: string | null;
  receiveFileName: string | null;
  receiveProgress: number | 0;
  receiveTimeLeft: number | 0;
}

export enum ConnFileStatusTypes {
  WAITING,
  LOADING,
  LOADED,
}

export enum DFileType {
  SEND_FILE,
  RECEIVE_FILE,
}

export enum StatusType {
  WAITING,
  PROCESSING,
  DONE,
}

export interface RawFile {
  name: string;
  path: string;
  size: number;
  lastModified: number;
}

export interface DFile {
  name: string;
  path: string;
  size: number;
  type: DFileType;
  status: StatusType;
}

export interface EmitValue {
  event: string;
  data: any;
}

export interface RAction {
  type: string;
  payload: any;
}

export interface TransferProgress {
  type: "send" | "receive";
  update: "start" | "progress" | "finish";
  percentage: number;
  left: number;
  filePath: string;
}

export interface TransferSendingAction {
  sending: boolean;
  sendFilePath: string | null;
  sendFileName: string | null;
}

export interface TransferSendProgressAction {
  sendProgress: number | 0;
  sendTimeLeft: number | 0;
}

export interface TransferReceivingAction {
  receiving: boolean;
  receiveFilePath: string | null;
  receiveFileName: string | null;
}

export interface TransferReceiveProgressAction {
  receiveProgress: number | 0;
  receiveTimeLeft: number | 0;
}

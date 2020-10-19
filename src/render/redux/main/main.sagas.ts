import { all, call, put, takeLatest } from "redux-saga/effects";
import { getIp } from "../../utils/all_utils";
import { fetchMyIp, fetchMyIpSuccess } from "./main.reducer";

// const { ipcRenderer } = window.require("electron");

const getMyIpPromise = async () => await getIp();

export function* onFetchMyIp() {
  yield takeLatest(fetchMyIp.type, function* () {
    yield put(fetchMyIpSuccess(yield getMyIpPromise()));
  });
}

export default function* mainSagas() {
  yield all([
    call(onFetchMyIp),
    // call(onFetchMyIp),
  ]);
}

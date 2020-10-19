import { all, call } from "redux-saga/effects";
import mainSagas from "./main/main.sagas";
import networkSagas from "./network/network.sagas";
import transferSagas from "./transfer/transfer.sagas";

export default function* rootSaga() {
  yield all([
    call(mainSagas),
    call(networkSagas),
    call(transferSagas),
    // call(...),
  ]);
}

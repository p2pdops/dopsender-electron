import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import mainReducer from "./main/main.reducer";
import networkReducer from "./network/network.reducer";
import transferReducer from "./transfer/transfer.reducer";

const rootReducer = combineReducers({
  main: mainReducer,
  network: networkReducer,
  transfer: transferReducer,
});

export default persistReducer(
  {
    key: "root",
    storage,
    blacklist: ["network", "main", "transfer"],
  },
  rootReducer
);

import { createStore, applyMiddleware, Middleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root.reducer";
import rootSaga from "./root.sagas";

const sagaMiddleware = createSagaMiddleware();

const middleware: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV === "development") middleware.push(logger);

export const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// persistor.purge()

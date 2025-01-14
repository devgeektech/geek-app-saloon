// src/store.js
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducer/rootReducer"; // You'll create this later
import rootSaga from "./saga/rootSaga"; // You'll create this later
import { configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createLogger } from 'redux-logger';


const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // blacklist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware, createLogger()],
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };

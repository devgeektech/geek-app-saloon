import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducer/rootReducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createLogger } from 'redux-logger';
import { userList } from "./actions/user/userSlice";
// import rootSaga from "./saga/rootSaga";


// const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // blacklist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  // middleware: [sagaMiddleware, createLogger()],


});

const persistor = persistStore(store);
// sagaMiddleware.run(rootSaga);

export { store, persistor };

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { userSlice } from "../Pages/userSlice";
import userDetailSlice from "../Pages/userDetailSlice";
import persistReducer from "redux-persist/es/persistReducer";
import { thunk } from "redux-thunk";


const reducers = combineReducers({
  user: userSlice,
  userDetails: userDetailSlice
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});
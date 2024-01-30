import {
  legacy_createStore,
  applyMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));

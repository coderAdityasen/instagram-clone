import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { curruser } from "./reducers/curruserReducer";
import { Postreducer } from "./reducers/Postreducer";

const rootReducer = combineReducers({
  user: userReducer,
  curruser : curruser,
  posts : Postreducer
});

export const store = configureStore({
  reducer: rootReducer,
});

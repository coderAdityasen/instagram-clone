import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { curruser } from "./reducers/curruserReducer";

const rootReducer = combineReducers({
  user: userReducer,
  curruser : curruser
});

export const store = configureStore({
  reducer: rootReducer,
});

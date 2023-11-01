import authSlice from "../reducers/auth";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authSlice,
});

export default rootReducer;

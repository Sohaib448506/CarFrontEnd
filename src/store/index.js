import thunk              from "redux-thunk";
import rootReducer        from "../reducers/rootReducer";
import { createLogger }   from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

const logger = createLogger({
  collapsed: true,
  predicate: (getState, action) => action?.type !== undefined,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger, thunk],
});

export default store;

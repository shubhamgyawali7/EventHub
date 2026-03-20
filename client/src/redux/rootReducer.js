import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import eventsReducer from "./events/eventsSlice";
import organizerReducer from "./organizerSlice";
import adminReducer from "./adminSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  admin: adminReducer,
  organizer: organizerReducer,
});
export default rootReducer;

import { combineReducers } from "redux";
import stateReducer from "./state";
import contentReducer from "./content";

const rootReducer = combineReducers({
  state: stateReducer,
  content: contentReducer,
});

export default rootReducer;

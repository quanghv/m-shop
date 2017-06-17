import { combineReducers } from "redux";
// import layoutReducer from "./layoutReducer";
import listReducer from "./listReducer";
import infoReducer from "./infoReducer";

const allReducers = combineReducers({
  // layoutHome: layoutReducer,
  data: listReducer,
  info: infoReducer
});
export default allReducers;

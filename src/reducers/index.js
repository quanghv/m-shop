import { combineReducers } from "redux";
// import layoutReducer from "./layoutReducer";
// import listReducer from "./listReducer";
import { getError, isLoading } from "./base";
import {
  listOrderConfirm,
  listOrderShipping,
  listOrderFinish,
  listOrderCancel
} from "./orderReducer";
import infoReducer from "./infoReducer";

const allReducers = combineReducers({
  isLoading,
  getError,
  listOrderConfirm,
  listOrderShipping,
  listOrderFinish,
  listOrderCancel,
  info: infoReducer
});
export default allReducers;

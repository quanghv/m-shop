import { combineReducers } from "redux";
// import layoutReducer from "./layoutReducer";
// import listReducer from "./listReducer";
import { getError, isLoading } from "./base";
import {
  listOrderConfirm,
  listOrderShipping,
  listOrderFinish,
  listOrderCancel,
  orderDetail,
  orderStatus
} from "./orderReducer";
import infoReducer from "./infoReducer";

const allReducers = combineReducers({
  isLoading,
  getError,
  listOrderConfirm,
  listOrderShipping,
  listOrderFinish,
  listOrderCancel,
  orderDetail,
  orderStatus,
  info: infoReducer
});
export default allReducers;

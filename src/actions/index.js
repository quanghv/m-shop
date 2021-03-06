import axios from "axios";
import constant from "../constant";
import { consoleLog } from "../appLog";

export const dispatchData = (dispatch, dispatchFunct) => {
  dispatch(dispatchFunct);
};

export const reponseFromApi = (data, type) => ({
  type,
  payload: data
});

export const isLoading = bool => ({
  type: constant.TYPES.LOADING,
  isLoading: bool
});

export const getError = bool => ({
  type: constant.TYPES.NETWORK_ERROR,
  getError: bool
});

//api action
export const getListThunk = (page, currentData, status) => dispatch => {
  const url = `http://m-shop.vn/api-list-order?page=${page}&size=${constant.PAGE_SIZE}&status=${status}`;

  consoleLog("axios get...", url);

  if (currentData === undefined) dispatchData(dispatch, isLoading(true));

  axios
    .get(url)
    .then(response => {
      if (currentData === undefined) {
        dispatchData(dispatch, dispatch(isLoading(false)));
      }

      consoleLog("get page", page);
      consoleLog(response.data);
      let dataFetched = response.data.data;
      // if (dataFetched.length > 0) {
      if (page > 1) {
        dataFetched = [...currentData, ...dataFetched];
      }
      consoleLog(dataFetched, "data new" + status);

      let type = null;
      switch (status) {
        case constant.STATUS.CONFIRM_SHIPPING:
        case constant.STATUS.SHIPPING:
          type = constant.TYPES.LIST_ORDER_SHIPPING;
          break;
        case constant.STATUS.FINISH:
          type = constant.TYPES.LIST_ORDER_FINISH;
          break;
        case constant.STATUS.CANCEL_USER:
        case constant.STATUS.CANCEL:
          type = constant.TYPES.LIST_ORDER_CANCEL;
          break;
        case constant.STATUS.CONFIRM:
          type = constant.TYPES.LIST_ORDER_CONFIRM;
          break;
        default:
          break;
      }
      dispatch(getError(false));
      dispatch(reponseFromApi(dataFetched, type));
      // }
    })
    .catch(error => {
      consoleLog("error", error);
      dispatch(getError(true));
    });
};

export const getOrderDetail = orderId => dispatch => {
  const url = `http://m-shop.vn/order-get-detail?order_id=
      ${orderId}`;

  consoleLog("getOrderDetail", url);
  dispatch(isLoading(true));
  axios
    .get(url)
    .then(response => {
      dispatch(getError(false));
      dispatch(isLoading(false));
      dispatch(reponseFromApi(response.data.data, constant.TYPES.ORDER_DETAIL));
    })
    .catch(error => {
      consoleLog("error", error);
      dispatch(getError(true));
    });
};

export const changeOrderStatus = (orderId, status) => dispatch => {
  const data = {
    order_id: orderId,
    status
  };
  axios
    .post("http://m-shop.vn/order-status-update", data)
    .then(response => {
      dispatch(getError(false));
      dispatch(
        reponseFromApi(response.data.data, constant.TYPES.CHANGE_ORDER_STATUS)
      );
    })
    .catch(error => {
      consoleLog("error", error);
      dispatch(getError(true));
    });
};

export const resetOrderStatus = () => dispatch => {
  dispatch(reponseFromApi(null, constant.TYPES.CHANGE_ORDER_STATUS));
};

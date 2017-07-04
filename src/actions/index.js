import axios from "axios";
import constant from "../constant";

export function getList(data, status) {
  let type = null;
  switch (status) {
    case constant.STATUS.SHIPPING:
      type = constant.TYPES.LIST_ORDER_SHIPPING;
      break;
    case constant.STATUS.FINISH:
      type = constant.TYPES.LIST_ORDER_FINISH;
      break;
    case constant.STATUS.CANCEL:
      type = constant.TYPES.LIST_ORDER_CANCEL;
      break;
    default:
      type = constant.TYPES.LIST_ORDER_CONFIRM;
      break;
  }
  return {
    type,
    payload: data
  };
}

export const isLoading = bool => {
  return {
    type: constant.TYPES.LOADING,
    isLoading: bool
  };
};

export function getError(bool) {
  return {
    type: constant.TYPES.NETWORK_ERROR,
    getError: bool
  };
}

export const getListThunk = (page, currentData, status) => {
  return dispatch => {
    let url =
      "http://m-shop.vn/api-list-order?page=" +
      page +
      "&size=" +
      constant.PAGE_SIZE +
      "&status=" +
      status;
    console.log("axios get...", url);

    if (currentData === undefined) dispatch(isLoading(true));

    axios
      .get(url)
      .then(response => {
        if (currentData === undefined) dispatch(isLoading(false));
        console.log("get page", page);
        // dispatch(getList(response.data.data));
        let dataFetched = response.data.data;
        // if (dataFetched.length > 0) {
        if (page > 1) {
          dataFetched = [...currentData, ...dataFetched];
        }
        console.log(dataFetched, "data new");
        dispatch(getList(dataFetched, status));
        // }
      })
      .catch(error => {
        dispatch(isLoading(false));
        console.log("error", error);
        dispatch(getError(true));
        // if (error.response) {
        //   // The request was made and the server responded with a status code
        //   // that falls out of the range of 2xx
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // } else if (error.request) {
        //   // The request was made but no response was received
        //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //   // http.ClientRequest in node.js
        //   console.log(error.request);
        // } else {
        //   // Something happened in setting up the request that triggered an Error
        //   console.log("Error", error.message);
        // }
        // console.log(error.config);
      });
  };
};

export function dataSelected(item) {
  // console.log(item);
  return {
    type: "Get_Info",
    payload: item
  };
}

import axios from "axios";
// import Frisbee from "frisbee";
import { Alert } from "react-native";
import constant from "../constant";

// const api = new Frisbee({
//   baseURI: "http://m-shop.vn"
// });

export function getList(data) {
  console.log(data, "xyz");
  return {
    type: "Get_List",
    payload: data
  };
}

export function getError(error) {
  return {
    type: "Error",
    payload: error
  };
}

export function getListThunk(page, currentData, status) {
  return function(dispatch, getState) {
    let url =
      "http://m-shop.vn/api-list-order?page=" +
      page +
      "&size=" +
      constant.PAGE_SIZE +
      "&status=" +
      status;
    console.log("axios get...", url);

    axios
      .get(url)
      .then(function(response) {
        console.log("get page", page);
        // dispatch(getList(response.data.data));
        let dataFetched = response.data.data;
        if (dataFetched.length > 0) {
          if (page > 1) {
            dataFetched = [...currentData, ...dataFetched];
          }
          console.log(dataFetched, "data new");
          dispatch(getList(dataFetched));
        }
      })
      .catch(error => {
        console.log("error", error);
        dispatch(getError(constant.NETWORK_ERROR));
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
}

export function dataSelected(item) {
  // console.log(item);
  return {
    type: "Get_Info",
    payload: item
  };
}

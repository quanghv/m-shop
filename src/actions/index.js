import axios from "axios";
import { Alert } from "react-native";
import constant from "../constant";

export function getList(data) {
  // console.log(data);
  return {
    type: "Get_List",
    payload: data
  };
}

export function getListThunk(page) {
  return function(dispatch, getState) {
    let url =
      "http://m-shop.vn/api-list-order?page=" +
      page +
      "&size=" +
      constant.PAGE_SIZE;
    console.log(url);
    axios
      .get(url)
      .then(function(response) {
        // response.data.data.isNew = true;
        console.log(response.data.data, "data new");
        dispatch(getList(response.data.data));
      })
      .catch(function(error) {
        Alert.alert(
          "Lỗi",
          "Không thể kết nối được với server.\n\nXin vui lòng thử lại sau ít phút..."
        );
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
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

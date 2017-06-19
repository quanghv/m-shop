import axios from "axios";
export function getList(data) {
  // console.log(data);
  return {
    type: "Get_List",
    payload: data
  };
}

export function getListThunk() {
  return function(dispatch, getState) {
    axios
      .get("http://m-shop.vn/order-get-new?order_status=99")
      .then(function(response) {
        // console.log(response.data.data);
        dispatch(getList(response.data.data));
      })
      .catch(error => {
        console.log(error, "error");
      });
    // fetch("http://m-shop.vn/order-get-new?order_status=99")
    //   .then(e => e.json())
    //   .then(function(response) {
    //     dispatch(getList(response.data));
    //   })
    //   .catch(error => {
    //     console.log(error, "error");
    //   });
  };
}

export function dataSelected(item) {
  // console.log(item);
  return {
    type: "Get_Info",
    payload: item
  };
}

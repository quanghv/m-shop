export function getList(data) {
  // console.log(data);
  return {
    type: "Get_List",
    payload: data
  };
}

export function getListThunk() {
  return function(dispatch, getState) {
    fetch("http://m-shop.vn/order-get-new?order_status=99")
      .then(e => e.json())
      .then(function(response) {
        // console.log(response.data);
        dispatch(getList(response.data));
      })
      .catch(error => {
        console.log(error, "error");
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
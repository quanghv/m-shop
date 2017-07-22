module.exports = {
  DEBUG: false,
  PAGE_SIZE: 10,
  TYPES: {
    LOADING: "Loading",
    NETWORK_ERROR: "NetworkError",
    LIST_ORDER_CONFIRM: "ListOrderConfirm",
    LIST_ORDER_SHIPPING: "ListOrderShipping",
    LIST_ORDER_FINISH: "ListOrderFinish",
    LIST_ORDER_CANCEL: "ListOrderCancel",
    ORDER_DETAIL: "OrderDetail",
    CHANGE_ORDER_STATUS: "ChangeOrderStatus"
  },
  STATUS: {
    CONFIRM: "-1",
    CONFIRM_SHIPPING: "-11",
    SHIPPING: "0",
    CANCEL_USER: "-12",
    CANCEL: "-2",
    FINISH: "1"
  },
  COLORS: {
    CONFIRM: "#BF360C",
    CONFIRM_SHIPPING: "#FF5722",
    SHIPPING: "#1976D2",
    CANCEL_USER: "#B0BEC5",
    CANCEL: "#7f8c8d",
    FINISH: "#2E7D32"
  }
};

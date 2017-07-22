import constant from "../constant";

export const listOrderConfirm = (state = null, action) => {
  switch (action.type) {
    case constant.TYPES.LIST_ORDER_CONFIRM:
      return action.payload;
    default:
      return state;
  }
};

export const listOrderShipping = (state = null, action) => {
  switch (action.type) {
    case constant.TYPES.LIST_ORDER_SHIPPING:
      return action.payload;
    default:
      return state;
  }
};

export const listOrderFinish = (state = null, action) => {
  switch (action.type) {
    case constant.TYPES.LIST_ORDER_FINISH:
      return action.payload;
    default:
      return state;
  }
};

export const listOrderCancel = (state = null, action) => {
  switch (action.type) {
    case constant.TYPES.LIST_ORDER_CANCEL:
      return action.payload;
    default:
      return state;
  }
};

export const orderDetail = (state = null, action) => {
  switch (action.type) {
    case constant.TYPES.ORDER_DETAIL:
      return action.payload;
    default:
      return state;
  }
};

export const orderStatus = (state = null, action) => {
  switch (action.type) {
    case constant.TYPES.CHANGE_ORDER_STATUS:
      return action.payload;
    default:
      return state;
  }
};

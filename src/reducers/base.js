import constant from "../constant";

export const isLoading = (state = null, action) => {
  switch (action.type) {
    case constant.TYPES.LOADING:
      return action.isLoading;
    default:
      return state;
  }
};

export const getError = (state = null, action) => {
  switch (action.type) {
    case constant.TYPES.NETWORK_ERROR:
      return action.getError;
    default:
      return state;
  }
};

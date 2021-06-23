import { productConstants } from "../actions/Constants";

const initState = {
  products: [],
  product: {},
  success: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCT_SUCCESS:
      state = {
        ...state,
        success: true,
        products: action.payload.products,
      };
      break;
    case productConstants.GET_PRODUCT_BY_ID_SUCCESS:
      state = {
        ...state,
        success: true,
        product: action.payload.product,
      };
      break;
  }
  return state;
};

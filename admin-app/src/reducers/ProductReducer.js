import { productConstants } from "../actions/Constants";

const initState = {
  products: [],
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
  }
  return state;
};

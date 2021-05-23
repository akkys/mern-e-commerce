import axiosInstance from "../helper/axios";
import { productConstants } from "./Constants";

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_BY_SLUG_REQUEST });
    const res = await axiosInstance.get(`/products/${slug}`);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_SLUG_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

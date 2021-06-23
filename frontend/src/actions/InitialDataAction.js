import axiosInstance from "../helper/axios";
import { initialDataConstants, productConstants } from "./Constants";

export const getInitialData = () => {
  return async (dispatch) => {
    dispatch({ type: initialDataConstants.GET_ALL_INITIAL_DATA_REQUEST });
    const res = await axiosInstance.post("/userInitialData");
    if (res.status === 200) {
      const { products } = res.data;

      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
    }
    console.log(res);
  };
};

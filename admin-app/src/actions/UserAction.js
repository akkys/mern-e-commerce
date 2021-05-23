import axiosInstance from "../helper/axios";
import { userConstants } from "./Constants";

export const signup = (user) => {
  return async (dispatch) => {
    console.log(user);
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const res = await axiosInstance.post("/admin/signup", {
      ...user,
    });
    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

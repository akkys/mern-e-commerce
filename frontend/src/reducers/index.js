import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import categoryReducer from "./CategoryReducer";
import productReducer from "./ProductReducer";
import cartReducer from "./CartReducer";
import userReducer from "./UserReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import userReducer from "./UserReducer";
import productReducer from "./ProductReducer";
import orderReducer from "./OrderReducer";
import categoryReducer from "./CategoryReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  order: orderReducer,
});

export default rootReducer;

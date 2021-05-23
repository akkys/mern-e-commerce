import { combineReducers } from "redux";
import categoryReducer from "./CategoryReducer";
import productReducer from "./ProductReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
});

export default rootReducer;

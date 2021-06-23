import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomeContainer/HomePage";
import ProductListPage from "./containers/ProductContainer/ProductListPage";
import { getCartItems, isUserLoggedIn, updateCart } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import ProductDetailsPage from "./containers/ProductDetailsContainer/ProductDetailsPage";
import ProductDetails from "./containers/ProductDetailsContainer/ProductDetails";
import CartPage from "./containers/CartContainer/CartPage";
import CheckoutPage from "./containers/CheckoutContainer/CheckoutPage";
import OrderPage from "./containers/OrderContainer/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsContainer/OrderDetailsPage";
import { getInitialData } from "./actions/InitialDataAction";

function App() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getInitialData());
  }, []);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate, dispatch]);

  useEffect(() => {
    dispatch(getCartItems());
    dispatch(updateCart());
  }, [auth.authenticate]);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />{" "}
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/account/orders" component={OrderPage} />
          <Route
            exact
            path="/order_details/:orderId"
            component={OrderDetailsPage}
          />
          <Route exact path="/:slug" component={ProductListPage} />
          {/* <Route
            exact
            path="/:productSlug/:productId/p"
            component={ProductDetailsPage}
          /> */}
          <Route
            exact
            path="/:productSlug/:productId/p"
            component={ProductDetails}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

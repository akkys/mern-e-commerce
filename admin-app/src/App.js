import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import SignUp from "./containers/SignUp/SignUp";
import SignIn from "./containers/SignIn/SignIn";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductPage from "./containers/Products/ProductPage";
import OrderPage from "./containers/Orders/OrderPage";
import CategoryPage from "./containers/Category/CategoryPage";
import { getInitialData, isUserLoggedIn } from "./actions";

function App() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, [auth.authenticate, dispatch]);
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/products" component={ProductPage} />
        <PrivateRoute path="/orders" component={OrderPage} />
        <PrivateRoute path="/category" component={CategoryPage} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./style.css";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import CartItemList from "./CartItemList";
import { addToCart, getCartItems, removeCartItem } from "../../actions";
import CartPricePage from "./CartPricePage";
import { Link } from "react-router-dom";

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  // const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();
  console.log("cart", cartItems);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQtyIncrement = (_id, qty) => {
    // console.log({ _id, qty });
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQtyDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  if (props.onlyCartItem) {
    return (
      <>
        {Object.keys(cartItems).map((key, i) => (
          <CartItemList
            key={i}
            cartItems={cartItems[key]}
            onQtyInc={onQtyIncrement}
            onQtyDec={onQtyDecrement}
            removeBtn
          />
        ))}
      </>
    );
  }

  return (
    <Layout>
      <div className="cartContainer">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="cardHeader">
                <h5>My Cart</h5>
              </div>
              {Object.keys(cartItems).map((key, i) => (
                <CartItemList
                  key={i}
                  cartItems={cartItems[key]}
                  onQtyInc={onQtyIncrement}
                  onQtyDec={onQtyDecrement}
                  onRemoveCartItem={onRemoveCartItem}
                />
              ))}
            </div>
          </div>

          <div className="col-md-4 productPriceMainContainer">
            <CartPricePage
              price="Price"
              deliver="Delivery Charges"
              total="Total Amount"
              totalItem={Object.keys(cart.cartItems).reduce(function (
                qty,
                key
              ) {
                return qty + cart.cartItems[key].qty;
              },
              0)}
              totalAmount={Object.keys(cart.cartItems).reduce(
                (totalPrice, key) => {
                  const { price, qty } = cart.cartItems[key];
                  return totalPrice + price * qty;
                },
                0
              )}
            />
          </div>
        </div>
        <div className="row placeOrder">
          <div className="col-md-5"></div>
          <div className="col-md-3">
            <Link to="/checkout" style={{ textDecoration: "none" }}>
              <button className="btn btn-md btn-block btn-order">
                PLACE ORDER
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

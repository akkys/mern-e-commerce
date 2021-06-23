import React, { useEffect, useState } from "react";
import "./style.css";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/UI/Card";
import InputField from "../../components/UI/InputField";
import CartPricePage from "../CartContainer/CartPricePage";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress, getCartItems } from "../../actions";
import CheckoutAddressForm from "./CheckoutAddressForm";
import CartItemList from "../CartContainer/CartItemList";
import CartPage from "../CartContainer/CartPage";

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      {props.noHeader ? null : (
        <div
          onClick={props.onClick}
          className={`checkoutHeader ${props.active && "activeTab"}`}
          style={{ cursor: "pointer" }}
        >
          <h5>
            {props.count && <span className="checkCount">{props.count}</span>}
            {props.title}
          </h5>
          {props.btnTitle && !props.active ? (
            <Button variant="outlined" color="primary">
              {props.btnTitle}
            </Button>
          ) : null}
        </div>
      )}
      <div>{props.children && props.children}</div>
    </div>
  );
};

const CheckoutPage = () => {
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirm, setOrderConfirm] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log("address", user.address);

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
  }, [user.address]);

  const closeForm = () => {
    setNewAddress(false);
  };

  const selectAddress = (addr) => {
    const updateAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updateAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const userOrderConfirm = () => {
    setOrderConfirm(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price * cart.cartItems[key].qty,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
    };
    console.log(payload);
    dispatch(addOrder(payload));
    setConfirmOrder(true);
  };

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  if (confirmOrder) {
    return (
      <Layout>
        <div style={{ marginTop: "5%" }}>Thank You</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="cartContainer">
        <div className="row">
          <div className="col-md-8">
            <CheckoutStep
              title="LOGIN"
              btnTitle="CHANGE"
              count="1"
              active={!auth.authenticate}
            >
              {auth.authenticate ? (
                <p style={{ padding: "5px", marginLeft: "40px" }}>
                  <span className="addressName">{auth.user.fullName}</span>{" "}
                  <span>{auth.user.email}</span>
                </p>
              ) : (
                <>
                  <InputField label="Email" inputType="input" />
                </>
              )}
            </CheckoutStep>
            <CheckoutStep
              title="DELIVERY ADDRESS"
              btnTitle="CHANGE"
              count="2"
              active={!confirmAddress && auth.authenticate}
            >
              {confirmAddress ? (
                <div className="selectedAddress">
                  <span className="addressName">{selectedAddress.name}</span>
                  <span>
                    {selectedAddress.address}
                    {", "}
                  </span>
                  <span>
                    {selectedAddress.cityDistrictTown} {", "}
                  </span>
                  <span>
                    {selectedAddress.state} {" - "}
                  </span>
                  <span className="addressName">{selectedAddress.pinCode}</span>
                </div>
              ) : (
                address.map((address, i) => {
                  return (
                    <div key={i} className="addressContainer">
                      {!address.edit ? (
                        <>
                          <div className="addressLeft">
                            <div className="form-check form-check-inline mb-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="address"
                                onClick={() => selectAddress(address)}
                              />
                              <label className="form-check-label form-label">
                                <p>
                                  <span className="addressName">
                                    {address.name}
                                  </span>
                                  <span className="addressType">
                                    {address.addressType}
                                  </span>
                                  <span className="addressMobile">
                                    {address.mobileNumber}
                                  </span>
                                </p>

                                <span className="addressDetail">
                                  {address.address}
                                  <span className="addressName ml-1">
                                    {address.pinCode}
                                  </span>
                                </span>
                              </label>
                            </div>{" "}
                            {address.selected && (
                              <div className="row mt-1 mb-3 ml-1  ">
                                <div className="col-md-4">
                                  <button
                                    className="btn btn-md btn-block btn-order"
                                    onClick={() =>
                                      confirmDeliveryAddress(address)
                                    }
                                  >
                                    DELIVER HERE
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>{" "}
                          {address.selected && (
                            <div className="addressRight">
                              <Button
                                color="primary"
                                onClick={() => enableAddressEditForm(address)}
                              >
                                Edit
                              </Button>
                            </div>
                          )}
                        </>
                      ) : (
                        <CheckoutAddressForm
                          onSubmitForm={onAddressSubmit}
                          initialData={address}
                        />
                      )}
                    </div>
                  );
                })
              )}
            </CheckoutStep>

            {confirmAddress ? null : (
              <CheckoutStep
                title="ADD A NEW ADDRESS"
                count="+"
                active={confirmAddress}
                onClick={() => setNewAddress(true)}
              >
                {auth.authenticate ? (
                  newAddress ? (
                    <CheckoutAddressForm closeForm={closeForm} />
                  ) : null
                ) : null}
              </CheckoutStep>
            )}

            <CheckoutStep
              title="ORDER SUMMARY"
              btnTitle="CHANGE"
              count="3"
              active={orderSummary}
            >
              {orderSummary ? (
                <CartPage onlyCartItem={true} />
              ) : orderConfirm ? (
                <span style={{ marginLeft: "7%", fontWeight: "500" }}>
                  {Object.keys(cart.cartItems).length} items
                </span>
              ) : null}
            </CheckoutStep>
            {orderSummary && (
              <CheckoutStep noHeader>
                <div className=" confirmMail">
                  <div className="">
                    <span className="confirmText">
                      Order confirmation email will be sent to
                      <span className="addressName">{auth.user.email}</span>
                    </span>
                  </div>
                  <div className="">
                    <button
                      className="btn btn-md btn-block btn-order"
                      onClick={userOrderConfirm}
                    >
                      CONTINUE
                    </button>
                  </div>
                </div>
              </CheckoutStep>
            )}

            <CheckoutStep
              title="PAYMENT OPTIONS"
              btnTitle="CHANGE"
              count="4"
              active={paymentOption}
            >
              {paymentOption && (
                <div className="paymentContainer">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentType"
                    value="cod"
                    // onClick={() => selectAddress(address)}
                  />
                  <label className="form-check-label form-label">
                    Cash on Delivery
                  </label>
                  <div className="mt-2">
                    <button
                      className="btn btn-md btn-order"
                      onClick={onConfirmOrder}
                    >
                      CONFIRM
                    </button>
                  </div>
                </div>
              )}
            </CheckoutStep>
          </div>
          <div className="col-md-4 productPriceMainContainer">
            <CartPricePage
              price="Price"
              deliver="Delivery Charges"
              total="Total Payable"
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
      </div>
    </Layout>
  );
};

export default CheckoutPage;

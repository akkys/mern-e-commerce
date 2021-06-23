import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/UI/Card";

const OrderDetailsPage = (props) => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.user.orderDetails);

  useEffect(() => {
    const payload = {
      orderId: props.match.params.orderId,
    };
    dispatch(getOrder(payload));
  }, []);

  if (!(orderDetails && orderDetails.address)) {
    return null;
  }
  return (
    <Layout>
      <div className="orderDetailsContainer">
        <Card noHeader>
          <div className="orderDetailsSubContainer">
            <h5>Delivery Address</h5>
            <span className="orderName">{orderDetails.address.name}</span>
            <p className="orderAddress">
              {orderDetails.address.address} - {orderDetails.address.pinCode}
            </p>
            <span className="orderName">
              Contact Number : {orderDetails.address.mobileNumber}
            </span>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;

import React, { useState } from "react";
import "./style.css";
import { Container } from "react-bootstrap";
import { Layout } from "../../components/Layout/Layout";
import Card from "../../components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { Select, Button, FormControl, InputLabel } from "@material-ui/core";
import { orderUpdate } from "../../actions/OrderAction";
import { BiRupee } from "react-icons/bi";

const OrderPage = () => {
  const [type, setType] = useState("");
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(orderUpdate(payload));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  return (
    <Layout sidebar menuIcon>
      <Container className="mt-4 mb-5">
        {order.orders.map((orderItem, i) => (
          <Card key={i} title={orderItem._id}>
            <div className="container">
              <div className="row mt-2">
                <div className="col-md-6 orderDiv1">
                  <label>Items</label>
                  {orderItem.items.map((item, i) => (
                    <div key={i}>
                      <span>{item.productId.name}</span>
                    </div>
                  ))}
                </div>
                <div className="col-md-2 orderDiv2">
                  <label>Total Price</label>
                  <p>
                    <BiRupee />
                    {orderItem.totalAmount}
                  </p>
                </div>
                <div className="col-md-2 orderDiv2">
                  <label>Payment Type</label>
                  <p style={{ textTransform: "uppercase" }}>
                    {orderItem.paymentType}
                  </p>
                </div>
                <div className="col-md-2 orderDiv2">
                  <label>Payment Status</label>
                  <p style={{ textTransform: "capitalize" }}>
                    {orderItem.paymentStatus}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div
                    style={{
                      boxSizing: "border-box",
                      padding: "50px",
                      display: "flex",
                    }}
                  >
                    <div className="orderTrack">
                      {orderItem.orderStatus.map((status) => (
                        <div
                          className={`orderStatus ${
                            status.isCompleted ? "active" : ""
                          }`}
                        >
                          <div
                            className={`point ${
                              status.isCompleted ? "active" : ""
                            }`}
                          ></div>
                          <div className="orderInfo">
                            <div className="status">{status.type}</div>
                            <div className="date">
                              {formatDate(status.date)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-4 orderSelectType">
                  <>
                    <select
                      native
                      onChange={(e) => setType(e.target.value)}
                      className="form-control"
                      size=""
                      style={{ fontSize: "14px" }}
                    >
                      <option>Select Status</option>
                      {orderItem.orderStatus.map((status) => {
                        return (
                          <>
                            {status.isCompleted ? null : (
                              <option
                                key={status.type}
                                value={status.type}
                                style={{ textTransform: "capitalize" }}
                              >
                                {status.type}
                              </option>
                            )}
                          </>
                        );
                      })}
                    </select>
                    <Button
                      variant="outlined"
                      className="orderConfirmBtn"
                      color="primary"
                      onClick={() => onOrderUpdate(orderItem._id)}
                    >
                      Confirm
                    </Button>
                  </>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </Container>
    </Layout>
  );
};

export default OrderPage;

import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/UI/Card";
import { generatePublicUrl } from "../../urlConfig";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      // return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }
    return "";
  };
  return (
    <Layout>
      <div className="orderMainContainer">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <a href="">My Account</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <a>My Orders</a>
            </li>
          </ol>
        </nav>
        {user.orders.map((order) => {
          return order.items.map((item) => (
            <Card noHeader>
              <Link
                to={`/order_details/${order._id}`}
                className="orderContainer"
              >
                <div className="orderImgContainer">
                  <img
                    src={generatePublicUrl(
                      item.productId.productPictures[0].img
                    )}
                    alt={item.productId.productPictures[0].img}
                  />
                </div>
                <div className="orderItemDetails">
                  <div className="orderName">{item.productId.name}</div>
                  <div className="orderPrice">
                    <BiRupee size="16px" />
                    {item.payablePrice}
                  </div>{" "}
                  <div className="orderStatus">
                    {order.orderStatus.map(
                      (status) =>
                        status.isCompleted === true && (
                          <li className="orderStatusList">
                            <span className="">
                              <span>{status.type}</span>
                            </span>{" "}
                            {" on "}
                            <span className="">{formatDate(status.date)}</span>
                          </li>
                        )
                    )}
                  </div>
                </div>
              </Link>
            </Card>
          ));
        })}
      </div>
    </Layout>
  );
};

export default OrderPage;

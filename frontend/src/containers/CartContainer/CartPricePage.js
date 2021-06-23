import React from "react";
import { BiRupee } from "react-icons/bi";
import Card from "../../components/UI/Card";

const CartPricePage = ({ price, deliver, total, totalAmount, totalItem }) => {
  return (
    <Card title="PRICE DETAILS">
      <div className="productPriceContainer">
        <div className="productPriceRow">
          <div className="">
            <span>
              {price} (
              {totalItem === 1 ? `${totalItem} item` : `${totalItem} items`})
            </span>
          </div>
          <div>
            <span>
              <BiRupee size="18px" />
              {totalAmount}
            </span>
          </div>
        </div>
        <div className="productPriceRow">
          <div>
            <span>{deliver}</span>
          </div>
          <div>
            <span>Free</span>
          </div>
        </div>
        <div className="productPriceRow totalPrice">
          <div>
            <span>{total}</span>
          </div>
          <div>
            <span>
              <BiRupee size="20px" />
              {totalAmount}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartPricePage;

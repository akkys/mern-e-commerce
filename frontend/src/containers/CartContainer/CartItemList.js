import React, { useState } from "react";
import { BiRupee } from "react-icons/bi";
import { generatePublicUrl } from "../../urlConfig";

const CartItemList = (props) => {
  const { cartItems, onQtyInc, onQtyDec, onRemoveCartItem } = props;
  const [qty, setQty] = useState(cartItems.qty);

  const { _id, name, img, price } = cartItems;

  const onQuantityInc = () => {
    setQty(qty + 1);
    onQtyInc(_id, qty + 1);
  };

  const onQuantityDec = () => {
    // if (qty <= 1) return;
    setQty(qty - 1);
    onQtyDec(_id, qty - 1);
  };

  return (
    <>
      <div className="productContainer row mt-3">
        <div className="col-md-2">
          <div className=" productImgContainer">
            <img src={generatePublicUrl(img)} />
          </div>
        </div>
        <div className="col-md-6">
          <span>{name.substring(0, 18).concat("...")}</span>

          <p className="productCartPrice">
            <BiRupee />
            {price * qty}
          </p>
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              {qty <= 1 ? (
                <button
                  className="input-group-text"
                  id="basic-addon1"
                  style={{ fontWeight: "550", cursor: "not-allowed" }}
                  onClick={onQuantityDec}
                  disabled
                >
                  -
                </button>
              ) : (
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  style={{ fontWeight: "550", cursor: "pointer" }}
                  onClick={onQuantityDec}
                >
                  -
                </span>
              )}
            </div>
            <input
              value={qty}
              className="form-control"
              style={{ textAlign: "center" }}
              readOnly
            />
            <div className="input-group-append">
              <span
                className="input-group-text"
                id="basic-addon2"
                style={{ fontWeight: "550", cursor: "pointer" }}
                onClick={onQuantityInc}
              >
                +
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <span className="deliverBy">Deliver by Mon Jun 7</span>{" "}
        </div>
      </div>
      <div className="row productSubContainer mt-2">
        {/* <div className="col-md-2"></div> */}
        <div className="col-md-8 saveAndremove">
          {props.removeBtn ? (
            <span className="ml-4">REMOVE</span>
          ) : (
            <>
              <span className=" " style={{ cursor: "not-allowed" }}>
                {" "}
                SAVE FOR LATER
              </span>
              <span
                className="ml-4"
                onClick={() => onRemoveCartItem(_id)}
                style={{ cursor: "pointer" }}
              >
                REMOVE
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartItemList;

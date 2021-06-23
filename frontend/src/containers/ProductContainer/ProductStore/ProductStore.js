import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug, getProductPage } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import { BiRupee } from "react-icons/bi";

const ProductStore = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const priceRange = product.priceRange;

  useEffect(() => {
    const { match } = props;
    dispatch(getProductBySlug(match.params.slug));
  }, []);
  const {} = props;
  return (
    <>
      <div className="productDetails">
        {Object.keys(product.productsByPrice).map((key, i) => {
          return (
            <>
              <div className="card">
                <div className="cardHeader">
                  <div>
                    <h5>
                      {props.match.params.slug} Mobile under {priceRange[key]}
                    </h5>
                  </div>
                  <button className="btn btn-primary btn-md text-light">
                    View All
                  </button>
                </div>

                <div className="row">
                  {product.productsByPrice[key].length === 0 && (
                    <div className="emptyContainer">
                      <h6>There is no mobile with this price range.</h6>
                    </div>
                  )}
                  {product.productsByPrice[key].map((product, i) => (
                    <div key={i} className="productContainer">
                      <div className="productImgContainer col-md-12">
                        <Link to={`${product.slug}/${product._id}/p`}>
                          <img
                            src={generatePublicUrl(
                              product.productPictures[0].img
                            )}
                            alt={product.productPictures[0].img}
                          />
                        </Link>
                      </div>

                      <div className="productInfo col-md-12">
                        <Link to={`${product.slug}/${product._id}/p`}>
                          {product.name}
                        </Link>

                        <div className="productPrice">
                          <BiRupee />
                          {product.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ProductStore;

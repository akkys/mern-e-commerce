import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../actions";
import Layout from "../../components/Layout/Layout";
import { generatePublicUrl } from "../../urlConfig";

const ProductListPage = (props) => {
  const [priceRange, setPriceRange] = useState({
    under5k: "5000",
    under10k: "10K",
    under15k: "15K",
    under20k: "20K",
    under30k: "30K",
  });
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    const { match } = props;
    dispatch(getProductBySlug(match.params.slug));
  }, []);

  return (
    <Layout>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div key={index} className="card">
            <div className="cardHeader">
              <div>
                {props.match.params.slug} Mobile under {priceRange[key]}
              </div>
              <button>View All</button>
            </div>
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <div key={product._id} className="productContainer">
                  <div className="productImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt={product.productPictures[0].img}
                    />
                  </div>
                  <div className="productInfo">
                    <div>{product.name}</div>
                    <div>
                      <span>4.5</span> <span>(3524)</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Layout>
  );
};

export default ProductListPage;

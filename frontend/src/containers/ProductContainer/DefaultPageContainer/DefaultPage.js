import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../../actions";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { generatePublicUrl } from "../../../urlConfig";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";

const DefaultPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  console.log("product", product);
  useEffect(() => {
    const { match } = props;
    dispatch(getProductBySlug(match.params.slug));
  }, []);
  return (
    <div className="defaultContainer">
      <h6>Men's T Shirts</h6>
      <div className="row">
        {product.products.length === 0 && (
          <div className="emptyContainer">
            <h6>There is no item found.</h6>
          </div>
        )}
        {product.products.map((product, i) => {
          return (
            <div key={i} className="col-md-2 mb-2">
              <Card variant="outlined">
                <CardContent className="defaultCard">
                  <Link to={`${product.slug}/${product._id}/p`}>
                    <div className="defaultImgContainer">
                      <img
                        src={generatePublicUrl(product.productPictures[0].img)}
                        alt=""
                      />
                    </div>
                    <div className="defaultRow">
                      <Typography className="defaultBrand">
                        {product.brand}
                      </Typography>
                      <h5 className="defaultName">{product.name}</h5>
                      <h6 className="defaultPrice">
                        <BiRupee size="16px" />
                        {product.price}
                      </h6>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DefaultPage;

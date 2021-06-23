import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions";
import getQueryParams from "../../../utils/getQueryParams";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;

  useEffect(() => {
    const params = getQueryParams(props.location.search);
    const payload = { params };
    dispatch(getProductPage(payload));
  }, []);
  return (
    <div style={{ margin: "0 10px" }}>
      <h5 className="mt-3">{page.title}</h5>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, i) => (
            <a key={i} style={{ display: "block" }} href={banner.navigateTo}>
              <img src={banner.img} alt="" />
            </a>
          ))}
      </Carousel>

      <div className="container page-container mt-3">
        <div className="row">
          {page.products &&
            page.products.map((product, i) => (
              <div key={i} className="col-md-4">
                <div className="productPageContainer">
                  <div className="productPageImgContainer">
                    <img src={product.img} alt={product.img} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

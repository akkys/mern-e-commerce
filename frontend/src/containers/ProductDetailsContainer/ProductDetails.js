import React, { useEffect } from "react";
import "./style.css";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProductDetailsById } from "../../actions";
import Layout from "../../components/Layout/Layout";
import { MaterialButton } from "../../components/MaterialUi/MaterialUi";
import { generatePublicUrl } from "../../urlConfig";
import { Link } from "react-router-dom";

const ProductDetails = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  // const category = useSelector((state) => state.category);
  console.log("product", product);
  useEffect(() => {
    const { productId } = props.match.params;
    const payload = {
      params: { productId },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  const handleAddToCart = () => {
    const { _id, name, price } = product.productDetails;
    const img = product.productDetails.productPictures[0].img;
    dispatch(addToCart({ _id, name, price, img }));
    props.history.push("/cart");
  };

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }
  return (
    <Layout menuHeader menuIcon>
      <div className="container productDescContainer">
        <div className="row mt-2">
          <div className="col-md-5">
            <div className="verticalImageStack mt-2 mb-2">
              {product.productDetails.productPictures.map((thumb, index) => (
                <div className="thumbnail" key={index}>
                  <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                </div>
              ))}
            </div>
            <div className=" productDescImgContainer">
              <img
                src={generatePublicUrl(
                  product.productDetails.productPictures[0].img
                )}
                alt={`${product.productDetails.productPictures[0].img}`}
              />
              <div className="btnRow mt-4">
                <div className="">
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-block btn-lg btn-cart"
                  >
                    <IoMdCart size="20px" className="mr-1 icons" />
                    ADD TO CART
                  </button>
                </div>
                <div className="">
                  <Link to="/checkout" className="btn btn-block btn-lg btn-buy">
                    <AiFillThunderbolt size="20px" className="mr-1" />
                    BUY NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 productDetailsContainer">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <a href="">Mobiles</a>
                </li>
                <li className="breadcrumb-item">
                  <Link
                  // to={`/${category.slug}?cid=${category._id}&type=${category.type}`}
                  >
                    Samsung
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <a href="#">{product.productDetails.name}</a>
                </li>
              </ol>
            </nav>
            <h6>
              {product.productDetails.brand
                ? product.productDetails.brand
                : null}
            </h6>
            <h5>{product.productDetails.name}</h5>
            <div>
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            <div className="extraOffer">
              Extra <BiRupee />
              4500 off{" "}
            </div>
            <div className="flexRow priceContainer">
              <span className="price">
                <BiRupee />
                {product.productDetails.price}
              </span>
              <span className="discount" style={{ margin: "0 10px" }}>
                22% off
              </span>
            </div>
            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Available Offers
              </p>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "14px",
                    color: "#878787",
                    fontWeight: "500",
                    marginRight: "20px",
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#212121",
                  }}
                >
                  {product.productDetails.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

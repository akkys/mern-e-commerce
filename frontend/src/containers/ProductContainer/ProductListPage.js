import React from "react";
import "./style.css";
import Layout from "../../components/Layout/Layout";
import ProductStore from "./ProductStore/ProductStore";
import getQueryParams from "../../utils/getQueryParams";
import ProductPage from "./ProductPage/ProductPage";
import DefaultPage from "./DefaultPageContainer/DefaultPage";

const ProductListPage = (props) => {
  const renderProducts = () => {
    const params = getQueryParams(props.location.search);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = <DefaultPage {...props} />;
    }
    return content;
  };
  return (
    <Layout menuHeader menuIcon>
      {renderProducts()}
    </Layout>
  );
};

export default ProductListPage;

import React from "react";
import ModalForm from "../../components/UI/ModalForm";
import { Col, Container, Row, Table } from "react-bootstrap";
import { generatePublicUrl } from "../../urlConfig";

const ProductDetails = (props) => {
  const {
    showProductModal,
    setShowProductModal,
    closeProductModal,
    productDetails,
  } = props;
  return (
    <ModalForm
      show={showProductModal}
      handleClose={closeProductModal}
      modalTitle="Product Details"
      size="lg"
      handleSubmit={() => setShowProductModal(false)}
    >
      <Row>
        <Col md={4}>
          <label className="key">Name</label>
          <p className="value">{productDetails.name}</p>
        </Col>
        <Col md={2}>
          <label className="key">Price</label>
          <p className="value">{productDetails.price}</p>
        </Col>
        <Col md={2}>
          <label className="key">Quantity</label>
          <p className="value">{productDetails.quantity}</p>
        </Col>
        <Col md={2}>
          <label className="key">Category</label>
          <p className="value">{productDetails.category.name}</p>
        </Col>
        <Col md={2}>
          <label className="key">Brand</label>
          <p className="value">{productDetails.brand}</p>
        </Col>
      </Row>
      {productDetails.highLights && (
        <Row>
          <Col md={12}>
            <label className="key">Highlights</label>
            <pre className="value">{productDetails.highLights}</pre>
          </Col>
        </Row>
      )}

      <Row>
        <Col md={12}>
          <label className="key">Description</label>
          <p className="value">{productDetails.description}</p>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <label className="key">Product Pictures</label>
          <div style={{ display: "flex", justifyContent: "" }}>
            {productDetails.productPictures.map((pic) => (
              <div className="productImgContainer">
                <img src={generatePublicUrl(pic.img)} />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </ModalForm>
  );
};

export default ProductDetails;

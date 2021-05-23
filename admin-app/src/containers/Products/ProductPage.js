import React, { useEffect, useState } from "react";
import "./style.css";
import { Layout } from "../../components/Layout/Layout";
import { Col, Container, Row, Table } from "react-bootstrap";
import InputField from "../../components/UI/InputField";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";
import ModalForm from "../../components/UI/ModalForm";
import ProductTable from "./ProductTable";
import { generatePublicUrl } from "../../urlConfig";

const ProductPage = () => {
  const [show, setShow] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [name, setName] = useState("");
  const [productPictures, setProoductPictures] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productDetails, setProductDetails] = useState(null);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductImage = (e) => {
    setProoductPictures([...productPictures, e.target.files[0]]);
  };

  const handleSubmit = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));
    setShow(false);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
  };

  const showProductDetailModal = (product) => {
    setShowProductModal(true);
    setProductDetails(product);
  };

  const productDetailModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <ModalForm
        show={showProductModal}
        handleClose={closeProductModal}
        modalTitle="Product Details"
        size="lg"
      >
        <Row>
          <Col md={6}>
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
        </Row>
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

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className="mt-3">
              <Row>
                <Col md={10}>
                  <h3>Products</h3>
                </Col>
                <Col md={2}>
                  <button
                    onClick={handleShow}
                    className="btn btn-sm btn-block btn-secondary"
                  >
                    Add
                  </button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <ProductTable
              product={product.products}
              showProductDetailModal={showProductDetailModal}
            />
          </Col>
        </Row>
      </Container>
      <ModalForm
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        modalTitle="Add New Product"
      >
        <InputField
          inputType="input"
          value={name}
          label="Product Name"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Select Category</label>
        <select
          className="custom-select form-control-sm"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <label className="mt-3">Category Image</label>
        <input
          type="file"
          className="form-control-file mb-3"
          name={productPictures}
          onChange={handleProductImage}
        />
        {productPictures.length > 0
          ? productPictures.map((pic, i) => <li key={i}>{pic.name}</li>)
          : null}
        <InputField
          inputType="input"
          value={quantity}
          label="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <InputField
          inputType="input"
          value={price}
          label="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <InputField
          inputType="textarea"
          value={description}
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </ModalForm>
      {productDetailModal()}
    </Layout>
  );
};

export default ProductPage;

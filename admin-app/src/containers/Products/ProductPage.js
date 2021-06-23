import React, { useEffect, useState } from "react";
import "./style.css";
import { Layout } from "../../components/Layout/Layout";
import { Col, Container, Row, Table } from "react-bootstrap";
import InputField from "../../components/UI/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getInitialData,
  getProductById,
  updateProduct,
} from "../../actions";
import ModalForm from "../../components/UI/ModalForm";
import ProductTable from "./ProductTable";
import { generatePublicUrl } from "../../urlConfig";
import FormHeader from "../../components/UI/FormHeader";
import ProductDetails from "./ProductDetails";
import { Button } from "@material-ui/core";

const ProductPage = (props) => {
  const [show, setShow] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [highLights, setHighLights] = useState("");
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
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const handleSubmit = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("brand", brand);
    form.append("price", price);
    form.append("highLights", highLights);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form)).then((result) => {
      if (result) {
        dispatch(getInitialData());
      }
    });
    setName("");
    setBrand("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setHighLights("");
    setCategoryId("");
    setProductPictures("");
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
      <ProductDetails
        showProductModal={showProductModal}
        closeProductModal={closeProductModal}
        productDetails={productDetails}
        setShowProductModal={setShowProductModal}
      />
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <FormHeader formTitle="Products" handleShow={handleShow} />
        <Row className="mt-3">
          <Col>
            <ProductTable
              product={product.products}
              showProductDetailModal={showProductDetailModal}
              getInitialData={getInitialData}
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

        <InputField
          inputType="select"
          label="Select Category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          options={createCategoryList(category.categories)}
          placeholder="Select Category"
        />
        <InputField
          inputType="input"
          value={brand}
          label="Product Brand"
          onChange={(e) => setBrand(e.target.value)}
        />

        <>
          <input
            id="outlined-button-file"
            multiple
            type="file"
            name={productPictures}
            onChange={handleProductImage}
            style={{ display: "none" }}
          />
          <label htmlFor="outlined-button-file">
            <Button
              variant="outlined"
              size=""
              component="span"
              style={{ borderRadius: "2px" }}
            >
              <span style={{ color: "rgba(0, 0, 0, 0.54)", padding: "0" }}>
                Select Images
              </span>
            </Button>
          </label>
        </>
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
          value={highLights}
          label="Highlights"
          onChange={(e) => setHighLights(e.target.value)}
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

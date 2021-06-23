import React from "react";
import { Col, Row } from "react-bootstrap";
import InputField from "../../components/UI/InputField";
import ModalForm from "../../components/UI/ModalForm";
import { Button } from "@material-ui/core";

const CreatePageModal = (props) => {
  const {
    createModal,
    handleSubmitForm,
    setCreateModal,
    categoryId,
    onCategoryChange,
    categories,
    title,
    setTitle,
    desc,
    setDesc,
    banners,
    handleBannerImages,
    handleProductImages,
    products,
  } = props;
  return (
    <ModalForm
      show={createModal}
      modalTitle="Create New Page"
      handleClose={() => setCreateModal(false)}
      handleSubmit={handleSubmitForm}
    >
      <InputField
        inputType="select"
        label="Select Category"
        value={categoryId}
        onChange={onCategoryChange}
        options={categories}
        placeholder="Select Category"
      />

      <InputField
        inputType="input"
        label="Page Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <InputField
        inputType="textarea"
        label="Page Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      {/* <>
        <label className="form-label">Select Banner Images</label>
        <input
          type="file"
          className="form-control-file"
          name="banners"
          onChange={handleBannerImages}
        />
      </> */}
      <>
        <input
          id="outlined-button-file"
          multiple
          type="file"
          name="banners"
          onChange={handleBannerImages}
          style={{ display: "none" }}
        />
        <label htmlFor="outlined-button-file">
          <Button
            variant="outlined"
            size=""
            component="span"
            style={{ borderRadius: "2px" }}
          >
            <span style={{ color: "rgba(0, 0, 0, 0.54)", padding: "0 20px" }}>
              Select Banner Images
            </span>
          </Button>
        </label>
        <br />
      </>
      {banners.length > 0
        ? banners.map((banner, i) => (
            <Row key={i}>
              <Col>
                <small>{banner.name}</small>
              </Col>
            </Row>
          ))
        : null}

      <>
        <input
          id="outlined-button-file"
          multiple
          type="file"
          name="products"
          onChange={handleProductImages}
          style={{ display: "none" }}
        />
        <label htmlFor="outlined-button-file">
          <Button
            variant="outlined"
            size=""
            component="span"
            style={{ borderRadius: "2px" }}
          >
            <span
              style={{
                color: "rgba(0, 0, 0, 0.54)",
                padding: "0 14px",
              }}
            >
              Select Products Images
            </span>
          </Button>
        </label>
      </>
      {products.length > 0
        ? products.map((product, i) => (
            <Row key={i}>
              <Col>
                <small>{product.name}</small>
              </Col>
            </Row>
          ))
        : null}
    </ModalForm>
  );
};

export default CreatePageModal;

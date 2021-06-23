import React from "react";
import { Col, Row } from "react-bootstrap";
import InputField from "../../components/UI/InputField";
import ModalForm from "../../components/UI/ModalForm";
import { Button } from "@material-ui/core";

const CreateCategoryModal = (props) => {
  const {
    categoryName,
    categoryImage,
    parentCategoryId,
    setCategoryName,
    setParentCategoryId,
    createCategoryList,
    category,
    createCategoryModal,
    handleClose,
    handleCategoryImage,
    handleSubmit,
  } = props;
  return (
    <ModalForm
      show={createCategoryModal}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      modalTitle="Add New Category"
    >
      <Row>
        <Col>
          <InputField
            inputType="input"
            value={categoryName}
            label="Category Name"
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Col>
        <Col>
          <InputField
            inputType="select"
            label="Select Category"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
            options={createCategoryList(category)}
            placeholder="Select Category"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <label className="form-label">Category Image</label>
          <input
            type="file"
            className="form-control-file"
            name={categoryImage}
            onChange={handleCategoryImage}
          /> */}

          <input
            id="outlined-button-file"
            multiple
            type="file"
            name={categoryImage}
            onChange={handleCategoryImage}
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
                  padding: "0 6px",
                }}
              >
                Select Products Images
              </span>
            </Button>
          </label>
        </Col>
      </Row>
    </ModalForm>
  );
};

export default CreateCategoryModal;

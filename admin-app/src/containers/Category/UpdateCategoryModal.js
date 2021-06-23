import React from "react";
import { Col, Row } from "react-bootstrap";
import InputField from "../../components/UI/InputField";
import ModalForm from "../../components/UI/ModalForm";
import { TextField, Select, InputLabel, FormControl } from "@material-ui/core";

const UpdateCategoryModal = (props) => {
  const {
    handleCloseUpdateCategory,
    updateCategoryModal,
    handleSubmit,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    createCategoryList,
    category,
  } = props;
  return (
    <ModalForm
      show={updateCategoryModal}
      handleClose={handleCloseUpdateCategory}
      handleSubmit={handleSubmit}
      modalTitle="Update Categories"
      size="lg"
    >
      <Row>
        <Col>
          <h6>Expanded Categories</h6>
        </Col>
      </Row>
      {expandedArray.length > 0 ? (
        expandedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <InputField
                inputType="input"
                value={item.name}
                label="Category Name"
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "expanded")
                }
              />
            </Col>
            <Col>
              <InputField
                inputType="select"
                label="Select Category"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "expanded"
                  )
                }
                options={createCategoryList(category)}
                placeholder="Select Category"
              />
            </Col>
            <Col>
              {/* <label className="form-label">Select Type</label>
              <select
                className="form-control form-control-sm shadow-none"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "expanded")
                }
              >
                <option>Select Type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select> */}
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Select Type
                </InputLabel>
                <Select
                  native
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                  label="Select Type"
                  size="small"
                  fullWidth
                  style={{ fontSize: "14px", color: "rgba(0, 0, 0, 0.54)" }}
                >
                  <option>Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </Select>
              </FormControl>
            </Col>
          </Row>
        ))
      ) : (
        <span className="form-label">No Category Expanded</span>
      )}

      <Row className="mt-3">
        <Col>
          <h6>Checked Categories</h6>
        </Col>
      </Row>
      {checkedArray.length > 0 ? (
        checkedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <InputField
                inputType="input"
                value={item.name}
                label="Category Name"
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "checked")
                }
              />
            </Col>
            <Col>
              <InputField
                inputType="select"
                label="Select Category"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "checked"
                  )
                }
                options={createCategoryList(category)}
                placeholder="Select Category"
              />
            </Col>
            <Col>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Select Type
                </InputLabel>
                <Select
                  native
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                  label="Select Type"
                  size="small"
                  fullWidth
                  style={{ fontSize: "14px", color: "rgba(0, 0, 0, 0.54)" }}
                >
                  <option>Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </Select>
              </FormControl>
            </Col>
          </Row>
        ))
      ) : (
        <span className="form-label">No Category Checked</span>
      )}
      {/* <label className="mt-3">Category Image</label>
        <input
          type="file"
          className="form-control-file"
          name={categoryImage}
          onChange={handleCategoryImage}
        /> */}
    </ModalForm>
  );
};

export default UpdateCategoryModal;

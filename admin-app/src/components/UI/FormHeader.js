import React from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "@material-ui/core";

const FormHeader = (props) => {
  const {
    formTitle,
    handleShow,
    update,
    updateCategory,
    handleDeleteCategoryModal,
  } = props;
  return (
    <Row>
      <Col md={12}>
        <div className="mt-3">
          <Row>
            <Col md={4}>
              <h3>{formTitle}</h3>
            </Col>
          </Row>
          <div className="formHeaderBtns">
            <Row className="mb-2">
              <Col md={1}>
                <button
                  onClick={handleShow}
                  className="btn btn-sm btn-block text-primary shadow-none"
                >
                  Add
                </button>
              </Col>
              {update && (
                <>
                  <Col md={1}>
                    <button
                      onClick={updateCategory}
                      className="btn btn-sm btn-block text-success shadow-none"
                    >
                      Update
                    </button>
                  </Col>
                  <Col md={1}>
                    <button
                      onClick={handleDeleteCategoryModal}
                      className="btn btn-sm btn-block text-danger shadow-none"
                    >
                      Delete
                    </button>
                  </Col>
                </>
              )}
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default FormHeader;

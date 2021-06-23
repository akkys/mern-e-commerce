import React from "react";
import "./style.css";
import { Button, Container, Modal } from "react-bootstrap";
import flipkartLogo from "../../images/logo/flipkart.png";

const ModalForm = (props) => {
  console.log("props", props);
  return (
    <Modal show={props.show} onHide={props.handleClose} size={props.size}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="modal_logo">
            <img src={flipkartLogo} className="logoimage" alt="" />
            <span className="modal_title">{props.modalTitle}</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>{props.children}</Container>
      </Modal.Body>
      <Modal.Footer>
        {props.buttons ? (
          props.buttons.map((btn, i) => (
            <Button
              key={i}
              variant={btn.color}
              className="shadow-none"
              size="md"
              onClick={btn.onClick}
            >
              {btn.label}
            </Button>
          ))
        ) : (
          <Button
            variant="primary"
            className="shadow-none"
            size="md"
            onClick={props.handleSubmit}
          >
            {props.productId ? "Edit" : "Save"}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;

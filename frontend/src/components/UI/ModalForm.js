import React from "react";
import "./style.css";
import { Button, Container, Form, Modal } from "react-bootstrap";
import flipkartLogo from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";

const ModalForm = (props) => {
  const {
    show,
    handleClose,
    size,
    modalTitle,
    buttons,
    label,
    handleSubmit,
    children,
  } = props;
  return (
    <Modal show={show} onHide={handleClose} size={size}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="logo">
            <img
              src={flipkartLogo}
              className="logoimage"
              alt=""
              style={{ marginLeft: "0px" }}
            />

            <span style={{ marginTop: "-10px" }}>
              <span className="exploreText">Explore</span>
              <span className="plusText">Plus</span>
              <img src={goldenStar} className="goldenStar" alt="" />
            </span>
            {/* {modalTitle} */}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form onSubmit={handleSubmit}>{children}</Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        {buttons ? (
          buttons.map((btn, i) => (
            <Button
              key={i}
              type="submit"
              variant={btn.color}
              className="shadow-none"
              size="md text-light"
              onClick={btn.onClick}
            >
              {btn.label}
            </Button>
          ))
        ) : (
          <Button
            type="submit"
            variant="dark"
            className="shadow-none"
            size="md"
            onClick={handleSubmit}
          >
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;

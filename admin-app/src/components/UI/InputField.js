import React from "react";
import { Form } from "react-bootstrap";

const InputField = (props) => {
  return (
    <>
      {props.inputType === "input" && (
        <Form.Group>
          <Form.Label>{props.label}</Form.Label>
          <Form.Control
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
          />
          <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
        </Form.Group>
      )}
      {props.inputType === "textarea" && (
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>{props.label}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={props.value}
            onChange={props.onChange}
          />
        </Form.Group>
      )}
      {props.inputType === "file" && (
        <Form>
          <Form.Group>
            <Form.File
              label={props.label}
              value={props.value}
              onChange={props.onChange}
            />
          </Form.Group>
        </Form>
      )}
    </>
  );
};

export default InputField;

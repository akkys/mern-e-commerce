import { TextField } from "@material-ui/core";
import React from "react";
import { Form } from "react-bootstrap";

const InputField = (props) => {
  const {
    label,
    placeholder,
    value,
    onChange,
    type,
    errorMessage,
    inputType,
    options,
  } = props;
  return (
    <>
      {inputType === "input" && (
        <Form.Group>
          {/* {label && <Form.Label>{label}</Form.Label>} */}
          {/* <Form.Control
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="form-control form-control-sm shadow-none"
          /> */}
          <TextField
            id="outlined-basic"
            variant="outlined"
            // size="small"
            type={type}
            label={label}
            value={value}
            onChange={onChange}
            fullWidth
          />
          <Form.Text className="text-muted">{errorMessage}</Form.Text>
        </Form.Group>
      )}
      {inputType === "textarea" && (
        <Form.Group controlId="exampleForm.ControlTextarea1">
          {/* {label && <Form.Label>{label}</Form.Label>}
          <Form.Control
            as="textarea"
            rows={3}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="form-control form-control-sm shadow-none"
          /> */}
          <TextField
            id="outlined-multiline-static"
            // size="small"
            // type={type}
            label={label}
            variant="outlined"
            value={value}
            onChange={onChange}
            rows={4}
            multiline
            fullWidth
          />
          {/* <TextField
            id="filled-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax={4}
            value={value}
            onChange={onChange}
            variant="filled"
          /> */}
        </Form.Group>
      )}
      {inputType === "file" && (
        <Form>
          <Form.Group>
            <Form.File label={label} value={value} onChange={onChange} />
          </Form.Group>
        </Form>
      )}
      {inputType === "select" && (
        <Form.Group controlId="exampleForm.ControlTextarea1">
          {label && <Form.Label>{label}</Form.Label>}
          <select
            className="form-control form-control-sm shadow-none"
            value={value}
            onChange={onChange}
          >
            <option>{placeholder}</option>
            {options.length > 0
              ? options.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.name}
                  </option>
                ))
              : null}
          </select>
        </Form.Group>
      )}
    </>
  );
};

export default InputField;

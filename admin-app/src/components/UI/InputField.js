import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { TextField, Select, InputLabel, FormControl } from "@material-ui/core";

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
  // const [focus, setFocus] = useState(false);
  // const [touch, setTouch] = useState(false);
  return (
    <>
      {inputType === "input" && (
        <FormControl>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            type={type}
            label={label}
            value={value}
            onChange={onChange}
            fullWidth
            // onFocus={(e) => {
            //   setFocus(true);
            //   setTouch(true);
            // }}
            // onBlur={(e) => {
            //   setFocus(false);
            //   setTouch(false);
            // }}
          />
          {/* {touch && <div>{label} is required</div>} */}
          {/* <Form.Text className="text-muted">{errorMessage}</Form.Text> */}
        </FormControl>
      )}
      {inputType === "textarea" && (
        <FormControl>
          <TextField
            id="outlined-multiline"
            label={label}
            type={type}
            multiline
            size="small"
            rows={3}
            value={value}
            onChange={onChange}
            variant="outlined"
            fullWidth
          />
        </FormControl>
      )}
      {inputType === "file" && (
        <Form>
          <Form.Group>
            <Form.File label={label} value={value} onChange={onChange} />
          </Form.Group>
        </Form>
      )}
      {inputType === "select" && (
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">
            {placeholder}
          </InputLabel>
          <Select
            native
            value={value}
            onChange={onChange}
            label={placeholder}
            size="small"
            fullWidth
            style={{ fontSize: "14px" }}
          >
            <option>{placeholder}</option>
            {options.length > 0
              ? options.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.name}
                  </option>
                ))
              : null}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default InputField;

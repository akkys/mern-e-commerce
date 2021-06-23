import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions";
import InputField from "../../components/UI/InputField";
import ModalForm from "../../components/UI/ModalForm";

const SignUpModal = (props) => {
  const { signUpModal, setSignUpModal, setLoginModal } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const userSignup = () => {
  //   const user = { firstName, lastName, email, password };
  //   if (
  //     firstName === "" ||
  //     lastName === "" ||
  //     email === "" ||
  //     password === ""
  //   ) {
  //     return;
  //   }

  //   dispatch(signup(user));
  // };

  const handleUserSignUp = () => {
    const user = { firstName, lastName, email, password };
    dispatch(signup(user));
    setSignUpModal(false);
    setLoginModal(true);
  };
  return (
    <ModalForm
      show={signUpModal}
      handleClose={() => setSignUpModal(false)}
      handleSubmit={handleUserSignUp}
      modalTitle="Sign Up"
      buttons={[
        {
          label: "Register",
          color: "primary",
          onClick: handleUserSignUp,
        },
      ]}
    >
      <Form>
        {/* {auth.error && (
          <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
        )} */}
        <InputField
          inputType="input"
          label="First Name"
          type="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <InputField
          inputType="input"
          label="Last Name"
          type="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <InputField
          inputType="input"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <InputField
          inputType="input"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form>
    </ModalForm>
  );
};

export default SignUpModal;

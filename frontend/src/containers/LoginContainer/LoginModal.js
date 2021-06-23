import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import InputField from "../../components/UI/InputField";
import ModalForm from "../../components/UI/ModalForm";
import { useDispatch } from "react-redux";
import { login, signout } from "../../actions";

const LoginModal = (props) => {
  const { loginModal, setLoginModal } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <ModalForm
      show={loginModal}
      handleClose={() => setLoginModal(false)}
      handleSubmit={userLogin}
      modalTitle="Login"
      buttons={[
        {
          label: "Login",
          color: "primary",
          onClick: userLogin,
        },
      ]}
    >
      <Form>
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

export default LoginModal;

import React, { useEffect, useState } from "react";
import { Navbar, Nav, Form, FormControl, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosCart, IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions";
import LoginModal from "../../containers/LoginContainer/LoginModal";
import flipkartLogo from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";
import { DropdownMenu } from "../MaterialUi/MaterialUi";
import SignUpModal from "../../containers/SignUpContainer/SignUpModal";

const Navigationbar = (props) => {
  const { openNav } = props;
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  console.log("user", auth.user.firstName);
  const dispatch = useDispatch();

  const cartTotal = Object.keys(cart.cartItems).length;
  // const cartTotal = Object.keys(cart.cartItems).reduce(function (qty, key) {
  //   return qty + cart.cartItems[key].qty;
  // }, 0);

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
      setSignUpModal(false);
    }
  }, [auth.authenticate]);

  const userLogout = () => {
    dispatch(signout());
  };

  const renderLogoutMenu = () => {
    return (
      <>
        <DropdownMenu
          menu={
            <span className="loginButton" onClick={() => setLoginModal(true)}>
              Login
            </span>
          }
          menus={[
            { label: "My Profile", href: "", icon: null },
            { label: "Flipkart Plus Zone", href: "", icon: null },
            {
              label: "Orders",
              href: "",
              icon: null,
              onClick: () => {
                !auth.authenticate && setLoginModal(true);
              },
            },
            { label: "Wishlist", href: "", icon: null },
            { label: "Rewards", href: "", icon: null },
            { label: "Gift Cards", href: "", icon: null },
          ]}
          firstMenu={
            <div className="firstmenu">
              <span>New Customer?</span>
              <span
                style={{ color: "#2874f0", cursor: "pointer" }}
                onClick={() => setSignUpModal(true)}
              >
                Sign Up
              </span>
            </div>
          }
        />
      </>
    );
  };

  const renderLoginMenu = () => {
    return (
      <>
        <DropdownMenu
          menu={<span className="fullName">{auth.user.firstName}</span>}
          menus={[
            { label: "My Profile", href: "", icon: null },
            { label: "Flipkart Plus Zone", href: "", icon: null },
            { label: "Orders", href: "/account/orders", icon: null },
            { label: "Wishlist", href: "", icon: null },
            { label: "Rewards", href: "", icon: null },
            { label: "Gift Cards", href: "", icon: null },
            {
              label: "Logout",
              href: "",
              icon: null,
              onClick: userLogout,
            },
          ]}
        />
      </>
    );
  };

  return (
    <>
      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
      <SignUpModal
        signUpModal={signUpModal}
        setSignUpModal={setSignUpModal}
        setLoginModal={setLoginModal}
      />
      <Navbar bg="primary" expand="lg" fixed="top">
        <Container>
          {props.menuIcon && (
            <IoMdMenu
              size="30px"
              color="#eee"
              fontWeight="bold"
              className="menuIcon"
              onClick={openNav}
            />
          )}

          <Navbar.Brand>
            <div className="logo">
              <a href="/">
                <img src={flipkartLogo} className="logoimage" alt="" />
              </a>
              <a style={{ marginTop: "-10px" }}>
                <span className="exploreText">Explore</span>
                <span className="plusText">Plus</span>
                <img src={goldenStar} className="goldenStar" alt="" />
              </a>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <FormControl
                type="text"
                placeholder="Search for products, brands and more"
                className="form-control-search"
              />
            </Nav>
            <Form inline>
              {auth.authenticate ? renderLoginMenu() : renderLogoutMenu()}
              <Nav.Link as={Link} className="cart" to="/cart">
                <IoIosCart />
                <div className="cartBadge">
                  <span className="ml-1">Cart</span>
                  <span className="badge">
                    {cartTotal === 0 ? null : cartTotal}
                  </span>
                </div>
              </Nav.Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigationbar;

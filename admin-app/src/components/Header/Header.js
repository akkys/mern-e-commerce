import React from "react";
import "./style.css";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../actions/AuthAction";
import { IoMdMenu } from "react-icons/io";
import flipkartLogo from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";

export const Header = (props) => {
  const { openNav, menuIcon } = props;
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  };

  const loggedInLinks = () => {
    return (
      <Nav>
        <Nav.Link>
          <p
            className="mr-2"
            // disabled
            style={{
              color: "#fff",
              border: "none",
              fontWeight: "500",
              width: "100%",
              paddingTop: "5px",
            }}
          >
            Signed in as : {auth.user.firstName}
          </p>
        </Nav.Link>
        <Nav.Link>
          <button
            className="btn btn-outline-light btn-sm shadow-none"
            onClick={logout}
            style={{ width: "100%" }}
          >
            Sign-out
          </button>
        </Nav.Link>
      </Nav>
    );
  };

  const nonLoggedInLinks = () => {
    return (
      <Nav>
        <Nav.Link as={Link} to="/signin">
          <button className="btn btn-light btn-sm shadow-none">Sign-In</button>
        </Nav.Link>
        <Nav.Link as={Link} to="/signup">
          <button className="btn btn-warning btn-sm shadow-none">
            Sign-Up
          </button>
        </Nav.Link>
      </Nav>
    );
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      bg="primary"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluid>
        <IoMdMenu
          size="30px"
          color="#eee"
          fontWeight="bold"
          onClick={openNav}
        />

        <Navbar.Brand as={Link} to="/" className="ml-2">
          <div className="logo">
            <a href="">
              <img src={flipkartLogo} className="logoimage" alt="" />
            </a>
            <a style={{ marginTop: "-10px" }}>
              <span className="exploreText">Explore</span>
              <span className="plusText">Plus</span>
              <img src={goldenStar} className="goldenStar" alt="" />
            </a>
          </div>
        </Navbar.Brand>
        <h5 className="text-light ml-3" style={{ fontWeight: "bold" }}>
          Admin Dashboard
        </h5>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>

          {auth.authenticate ? loggedInLinks() : nonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

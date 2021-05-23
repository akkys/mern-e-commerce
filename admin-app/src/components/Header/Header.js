import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../actions/AuthAction";

export const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  };

  const loggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link as={Link} to="/signin">
        Sign-In
      </Nav.Link> */}
        <Nav.Link>
          <span onClick={logout}>Sign-out</span>
        </Nav.Link>
      </Nav>
    );
  };

  const nonLoggedInLinks = () => {
    return (
      <Nav>
        <Nav.Link as={Link} to="/signin">
          Sign-In
        </Nav.Link>
        <Nav.Link as={Link} to="/signup">
          Sign-Up
        </Nav.Link>
      </Nav>
    );
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Admin Dashboard
        </Navbar.Brand>
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

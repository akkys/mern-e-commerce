import React from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Header } from "../Header/Header";
import { IoIosCloseCircle } from "react-icons/io";
import flipkartLogo from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";

export const Layout = (props) => {
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "230px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0px";
  };

  return (
    <>
      <Header openNav={openNav} menuIcon={props.menuIcon} />
      {props.sidebar ? (
        <>
          <Container>
            <Row>
              <Col id="mySidenav" className="sidebar">
                <ul>
                  <div className="logo">
                    {/* <img src={flipkartLogo} className="logoimage mt-2" alt="" /> */}
                    <p></p>
                    <span className="closebtn" onClick={closeNav}>
                      <IoIosCloseCircle />
                    </span>
                  </div>

                  <li className="mt-3">
                    <NavLink exact to="/">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/page">
                      Page
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/category">Categories</NavLink>
                  </li>
                  <li>
                    <NavLink to="/products">Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="/orders">Orders</NavLink>
                  </li>
                </ul>
              </Col>
              <Col md={12} style={{ marginLeft: "auto", paddingTop: "70px" }}>
                {props.children}
              </Col>
              {/* <Col md={1}></Col> */}
            </Row>
          </Container>
        </>
      ) : (
        props.children
      )}
    </>
  );
};

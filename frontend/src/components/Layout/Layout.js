import React, { useEffect, useState } from "react";
import "./style.css";
import Navigationbar from "../Header/Navigationbar";
import Header from "../Header/Header";
import MenuHeader from "../MenuHeader/MenuHeader";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../actions";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosCheckboxOutline,
  IoIosCloseCircle,
  IoIosSquareOutline,
} from "react-icons/io";
import flipkartLogo from "../../images/logo/flipkart.png";

const Layout = (props) => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "300px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0px";
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  console.log("category");

  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push(
        <li key={category._id}>
          {category.parentId ? (
            <a
              href={`/${category.slug}?cid=${category._id}&type=${category.type}`}
            >
              {category.name}
            </a>
          ) : (
            <span>{category.name}</span>
          )}

          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return categoryList;
  };

  return (
    <>
      <Navigationbar openNav={openNav} menuIcon={props.menuIcon} />
      {props.menuHeader || props.sideMenubar ? (
        <>
          <MenuHeader />
          <div id="mySidenav" className="sidebar">
            <ul
              className="mt-3 mb-0"
              style={{
                borderBottom: "1px solid #cecece",
                marginLeft: "0",
                textAlign: "center",
              }}
            >
              <>
                <h5>Categories</h5>
                <span className="closebtn" onClick={closeNav}>
                  <IoIosCloseCircle />
                </span>
              </>
            </ul>
            <ul className="mainCategory">
              {category.categories.length > 0
                ? renderCategories(category.categories)
                : null}
            </ul>
          </div>
          {props.children}
        </>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
};

export default Layout;

import { FormControl, InputLabel, Select } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import {
  IoIosCloseCircle,
  IoMdMenu,
  IoMdOpen,
  IoMdTrash,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductById } from "../../actions";

const ProductTable = ({ product, showProductDetailModal, getInitialData }) => {
  console.log("Products", product);
  const [filterText, setFilterText] = useState([]);
  const [sortAsc, setSortAsc] = useState([]);
  const [sortDes, setSortDes] = useState([]);

  const openNav = () => {
    document.getElementById("mySideCat").style.width = "300px";
  };

  const closeNav = () => {
    document.getElementById("mySideCat").style.width = "0px";
  };

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push(
        <li key={category._id} value={category.name}>
          {category.parentId ? (
            <>
              <button
                style={{
                  padding: "2px",
                  border: "none",
                  background: "none",
                  fontSize: "14px",
                }}
                onClick={handleFilter}
                value={category.name}
              >
                {category.name}
              </button>
            </>
          ) : null}

          {category.children.length > 0 ? (
            <ol
              style={{
                marginBottom: "10px",
                fontSize: "15px",
              }}
            >
              {renderCategories(category.children)}
            </ol>
          ) : null}
        </li>
      );
    }
    return categoryList;
  };

  useEffect(() => {
    setFilterText(product);
  }, [product]);

  const handleFilter = (e) => {
    const byFilter = e.target.value;
    let filterText = [];
    let computedProducts = product;
    if (e.target.value === "all") {
      filterText = computedProducts;
    } else {
      filterText = computedProducts.filter(
        (product) =>
          product.category.name === byFilter || product.brand === byFilter
      );
    }
    setFilterText(filterText);
    // console.log(filterText);
  };

  const defaultSort = () => {
    // setFilterText(product);
    dispatch(getInitialData());
  };

  const sortByPriceAsc = () => {
    let sortedProductsAsc;
    sortedProductsAsc = filterText.sort((a, b) => {
      return parseInt(a.price) - parseInt(b.price);
    });
    setSortAsc(sortedProductsAsc);
  };

  const sortByPriceDes = () => {
    let sortedProductsDes;
    sortedProductsDes = filterText.sort((a, b) => {
      return parseInt(b.price) - parseInt(a.price);
    });
    setSortDes(sortedProductsDes);
  };

  return (
    <>
      <div id="mySideCat" className="sidebar">
        <ul>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p></p>
            <span className="closebtn" onClick={closeNav}>
              <IoIosCloseCircle style={{ marginTop: "0" }} />
            </span>
          </div>
        </ul>
        <ul className="mainCategory">
          {category.categories.length > 0
            ? renderCategories(category.categories)
            : null}
        </ul>
      </div>
      <div className="row">
        <div className="col-md-4">
          <IoMdMenu
            size="30px"
            color="#333"
            fontWeight="bold"
            className="CatIcon"
            onClick={openNav}
          />
          <span>Categories</span>
        </div>
        <div className="col-md-8 sortByPriceBtns">
          <span className="">Sort By Price: </span>
          <button onClick={sortByPriceAsc} className="btn btn-sm text-primary">
            Low To High
          </button>
          <button onClick={sortByPriceDes} className="btn btn-sm text-primary">
            High To Low
          </button>
          <button onClick={defaultSort} className="btn btn-sm text-primary">
            Default
          </button>
        </div>
      </div>
      <Table hover responsive="sm" size="sm" style={{ fontSize: "14px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th style={{ textAlign: "right" }}>Price</th>
            <th style={{ textAlign: "right" }}>Quantity</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterText.length > 0
            ? filterText.map((product, i) => (
                <tr key={product._id}>
                  <td>{i + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>
                  <td style={{ textAlign: "right" }}>
                    <BiRupee />
                    {product.price}
                  </td>
                  <td style={{ textAlign: "right" }}>{product.quantity}</td>
                  <td
                    style={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="btn btn-sm btn-block text-primary shadow-none"
                      style={{ marginTop: "0", padding: "0" }}
                    >
                      <IoMdOpen
                        onClick={() => showProductDetailModal(product)}
                      />
                    </button>
                    {"|"}
                    <button
                      className="btn btn-sm btn-block text-danger shadow-none "
                      style={{ marginTop: "0", padding: "0" }}
                    >
                      <IoMdTrash
                        size="18px"
                        onClick={() => {
                          const payload = {
                            productId: product._id,
                          };
                          dispatch(deleteProductById(payload));
                        }}
                      />
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </>
  );
};

export default ProductTable;

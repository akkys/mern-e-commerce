import React, { useState } from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import { Layout } from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions";
import InputField from "../../components/UI/InputField";
import ModalForm from "../../components/UI/ModalForm";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckbox,
  IoIosCheckboxOutline,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosSquareOutline,
} from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const CategoryPage = () => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push(
        {
          label: category.name,
          value: category._id,
          children:
            category.children.length > 0 && renderCategories(category.children),
        }
        // <li key={category._id}>
        //   {category.name}
        //   {category.children.length > 0 ? (
        //     <ul>{renderCategories(category.children)}</ul>
        //   ) : null}
        // </li>
      );
    }
    return categoryList;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    setCategoryImage("");
    setShow(false);
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className="mt-3">
              <Row>
                <Col md={10}>
                  <h3>Categories</h3>
                </Col>
                <Col md={2}>
                  <button
                    onClick={handleShow}
                    className="btn btn-sm btn-block btn-secondary"
                  >
                    Add
                  </button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckboxOutline />,
                uncheck: <IoIosSquareOutline />,
                halfCheck: <IoIosSquareOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
      </Container>
      <ModalForm
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        modalTitle="Add New Category"
      >
        <InputField
          inputType="input"
          value={categoryName}
          label="Category Name"
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <label>Select Category</label>
        <select
          className="custom-select form-control-sm"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <label className="mt-3">Category Image</label>
        <input
          type="file"
          className="form-control-file"
          name={categoryImage}
          onChange={handleCategoryImage}
        />
      </ModalForm>
    </Layout>
  );
};

export default CategoryPage;

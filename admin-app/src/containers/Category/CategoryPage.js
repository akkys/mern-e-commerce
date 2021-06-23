import React, { useState } from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import { Layout } from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategories,
  getAllCategories,
  updateCategories,
} from "../../actions";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckbox,
  IoIosCheckboxOutline,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosSquareOutline,
} from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CreateCategoryModal from "./CreateCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import FormHeader from "../../components/UI/FormHeader";
import DeleteCategoryModal from "./DeleteCategoryModal";

const CategoryPage = () => {
  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const handleShow = () => setCreateCategoryModal(true);
  const handleClose = () => setCreateCategoryModal(false);

  const handleCloseUpdateCategory = () => setUpdateCategoryModal(false);
  const handleCloseDeleteCategory = () => setDeleteCategoryModal(false);

  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return categoryList;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
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
    setCreateCategoryModal(false);
  };

  const handleUpdateCategories = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form));
    setUpdateCategoryModal(false);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const handleDeleteCategoryModal = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const handleDeleteCategory = () => {
    const checkedIdsArray = checkedArray.map((item, i) => ({
      _id: item.value,
    }));
    const expandedIdsArray = checkedArray.map((item, i) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategories(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategories());
        }
      });
      handleCloseDeleteCategory();
    }
  };

  return (
    <Layout sidebar>
      <Container>
        <FormHeader
          formTitle="Categories"
          handleShow={handleShow}
          update
          updateCategory={updateCategory}
          handleDeleteCategoryModal={handleDeleteCategoryModal}
        />
        <Row>
          <Col md={12}>
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

      {/* Create Category Modal */}
      <CreateCategoryModal
        categoryName={categoryName}
        categoryImage={categoryImage}
        parentCategoryId={parentCategoryId}
        setCategoryName={setCategoryName}
        setParentCategoryId={setParentCategoryId}
        createCategoryList={createCategoryList}
        category={category.categories}
        createCategoryModal={createCategoryModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleCategoryImage={handleCategoryImage}
      />

      {/* Update Category Modal. */}
      <UpdateCategoryModal
        handleCloseUpdateCategory={handleCloseUpdateCategory}
        handleSubmit={handleUpdateCategories}
        updateCategoryModal={updateCategoryModal}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        createCategoryList={createCategoryList}
        category={category.categories}
      />
      {/* Delete Category Modal */}
      <DeleteCategoryModal
        deleteCategoryModal={deleteCategoryModal}
        handleCloseDeleteCategory={handleCloseDeleteCategory}
        setDeleteCategoryModal={setDeleteCategoryModal}
        handleDeleteCategory={handleDeleteCategory}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
      />
    </Layout>
  );
};

export default CategoryPage;

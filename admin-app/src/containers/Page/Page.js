import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPage, getPage } from "../../actions";
import { Layout } from "../../components/Layout/Layout";
import FormHeader from "../../components/UI/FormHeader";
import linearCategories from "../../helper/linearCategories";
import CreatePageModal from "./CreatePageModal";

const Page = () => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
    console.log("cats", categories);
  }, [category]);

  useEffect(() => {
    if (!page.loading) {
      setCreateModal(false);
      setTitle("");
      setDesc("");
      setCategoryId("");
      setProducts([]);
      setBanners([]);
    }
  }, [page]);

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value === e.target.value
    );
    setCategoryId(e.target.value);
    console.log("cates", categories);
    console.log("cate", category);
    setType(category.type);
  };

  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const handleSubmitForm = () => {
    const form = new FormData();
    form.append("title", title);
    form.append("desc", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, i) => {
      form.append("banners", banner);
    });
    products.forEach((product, i) => {
      form.append("products", product);
    });
    dispatch(createPage(form));
    setCreateModal(false);
  };

  return (
    <Layout sidebar>
      <Container>
        <FormHeader formTitle="Pages" handleShow={() => setCreateModal(true)} />
        {page.loading ? (
          <p>Page Creating... Please wait...</p>
        ) : (
          <>
            <CreatePageModal
              createModal={createModal}
              handleSubmitForm={handleSubmitForm}
              setCreateModal={setCreateModal}
              categoryId={categoryId}
              onCategoryChange={onCategoryChange}
              categories={categories}
              title={title}
              setTitle={setTitle}
              desc={desc}
              setDesc={setDesc}
              banners={banners}
              handleBannerImages={handleBannerImages}
              handleProductImages={handleProductImages}
              products={products}
            />
            {/* <button
              className="btn btn-outline-dark btn-sm shadow-none mt-3"
              onClick={() => setCreateModal(true)}
            >
              Create Page
            </button> */}
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Page;

const slugify = require("slugify");
const Product = require("../models/Product");
const Category = require("../models/Category");

const createProduct = (req, res) => {
  // res.status(200).json({ file: req.files, body: req.body });
  const {
    name,
    brand,
    price,
    highLights,
    description,
    category,
    quantity,
    createdBy,
  } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    brand,
    price,
    quantity,
    highLights,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const productsData = await Product.findByIdAndUpdate({
      _id: productId,
    });
    if (productsData) {
      productsData.name = req.body.name;
      // productsData.productPictures = req.body.productPictures;
      productsData.brand = req.body.brand;
      // productsData.highLights = req.body.highLights;
      // productsData.category = req.body.category;
      productsData.price = req.body.price;
      // productsData.mrp = req.body.mrp;
      productsData.quantity = req.body.quantity;
      productsData.descriptions = req.body.descriptions;
    }

    const updateProducts = await productsData.save();
    res.status(201).json({ updateProducts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id type")
    .exec((error, category) => {
      if (error) {
        res.status(400).json({ error });
      }
      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) {
            res.status(400).json({ error });
          }
          if (category.type) {
            if (products.length > 0) {
              res.status(200).json({
                products,
                priceRange: {
                  under5k: 5000,
                  under10k: 10000,
                  under15k: 15000,
                  under20k: 20000,
                  under30k: 30000,
                },
                productsByPrice: {
                  under5k: products.filter((product) => product.price <= 5000),
                  under10k: products.filter(
                    (product) => product.price > 5000 && product.price <= 10000
                  ),
                  under15k: products.filter(
                    (product) => product.price > 10000 && product.price <= 15000
                  ),
                  under20k: products.filter(
                    (product) => product.price > 15000 && product.price <= 20000
                  ),
                  under30k: products.filter(
                    (product) => product.price > 20000 && product.price <= 30000
                  ),
                },
              });
            }
          } else {
            res.status(200).json({ products });
          }
        });
      }
    });
};

const getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

const deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

const getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user._id })
    .select(
      "_id name price highLights quantity slug description productPictures category"
    )
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({})
    .select(
      "_id name price highLights quantity slug description productPictures category"
    )
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};

module.exports = {
  createProduct,
  updateProduct,
  getProductBySlug,
  getProductDetailsById,
  deleteProductById,
  getProducts,
  getAllProducts,
};

const Category = require("../../models/Category");
const Product = require("../../models/Product");
const Order = require("../../models/Order");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId,
      type: cat.type,
      children: createCategories(categories, cat._id),
    });
  }
  return categoryList;
}

const initialData = async (req, res) => {
  const categories = await Category.find({}).exec();
  const products = await Product.find({})
    .select(
      "_id name brand highLights category price quantity slug description productPictures"
    )
    .populate({ path: "category", select: "_id name" })
    .exec();
  const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec();
  res
    .status(200)
    .json({ categories: createCategories(categories), products, orders });
};

const userInitialData = async (req, res) => {
  const products = await Product.find({})
    .select(
      "_id name brand highLights category price quantity slug description productPictures"
    )
    .exec();
  res.status(200).json({ products });
};

module.exports = { initialData, userInitialData };

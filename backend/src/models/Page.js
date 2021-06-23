const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageSchema = new Schema(
  {
    title: { type: String, trim: true, required: true },
    desc: { type: String, trim: true, required: true },
    banners: [
      {
        img: { type: String },
        navigateTo: { type: String },
      },
    ],
    products: [
      {
        img: { type: String },
        navigateTo: { type: String },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Page = mongoose.model("page", pageSchema);

module.exports = Page;

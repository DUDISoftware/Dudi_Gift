const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema(
  {
    category_name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
  },
  { timestamps: true } // Tự động tạo createdAt và updatedAt
);

module.exports = mongoose.model("ProductCategory", productCategorySchema);

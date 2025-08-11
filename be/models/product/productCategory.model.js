const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema(
  {
    category_name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    icon: String, // ➕ Thêm trường icon (URL hoặc tên biểu tượng)
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductCategory", productCategorySchema);

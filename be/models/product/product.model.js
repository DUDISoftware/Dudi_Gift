// product.model.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory" },
    image_url: {
      url: String,
      public_id: String,
    },
    sub_images_urls: [
      {
        url: String,
        public_id: String,
      },
    ],
    location: String,
    label: { type: String, default: "Mới" },
    is_heavy: Boolean,
    contact_phone: String,
    contact_zalo: String,
    quality: {
      type: String,
      enum: ["new", "used", "like_new_90", "like_new_70"],
      default: "new",
    },
    status: {
      type: String,
      enum: ["active", "given", "hidden"],
      default: "active",
    },
    delivery_method: {
      type: String,
      enum: ["giao_tan_tay", "nguoi_nhan_den_lay", "gap_tai_tay"],
      default: "giao_tan_tay",
    },
    view_count: { type: Number, default: 0 },
    interested_count: { type: Number, default: 0 },

    // 🔹 Thêm trường này để lưu id người được tặng
    given_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

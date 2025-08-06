const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const uploadProductImages = require("../middleware/uploadProductImages");
const verifyToken = require("../middleware/verifyToken"); // 👈 cần để lấy user từ token

router.post("/", uploadProductImages, productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/my", verifyToken, productController.getMyProducts);
router.get("/user/:userId", productController.getProductsByUser);
router.get("/category/:categoryId", productController.getProductsByCategory); // 👈 Đưa lên trước
router.get("/new", productController.getNewProducts); // 🆕 Lấy 8 sản phẩm mới nhất
router.get("/popular", productController.getPopularProducts); // 🆕 Thêm route lấy sản phẩm phổ biến
router.get("/:id", productController.getProductById); // 👈 Để sau cùng
router.put("/:id", uploadProductImages, productController.updateProduct); // ✅ THÊM middleware
router.delete("/:id", productController.deleteProduct);

module.exports = router;

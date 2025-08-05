const ProductCategory = require("../models/product/productCategory.model");

// Create
exports.createCategory = async (req, res) => {
  try {
    const { category_name, slug, description } = req.body;
    const newCategory = await ProductCategory.create({ category_name, slug, description });
    res.status(201).json({ success: true, category: newCategory });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find();
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await ProductCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, error: "Không tìm thấy" });
    res.json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update
exports.updateCategory = async (req, res) => {
  try {
    const updated = await ProductCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, category: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete
exports.deleteCategory = async (req, res) => {
  try {
    await ProductCategory.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

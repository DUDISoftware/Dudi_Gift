const Product = require("../models/product/product.model");
const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      label,
      is_heavy,
      contact_phone,
      contact_zalo,
      quality,
      status,
      delivery_method,
    } = req.body;

    const user_id = req.user.id; // ✅ Gán user_id từ token

    let rawSlug = slugify(title, { lower: true, strict: true });
    let finalSlug = rawSlug;
    let count = 1;
    while (await Product.findOne({ slug: finalSlug })) {
      finalSlug = `${rawSlug}-${count++}`;
    }

    const mainImageFile = req.files["image_url"]?.[0];
    const subImageFiles = req.files["sub_images_urls"] || [];

    const mainImage = mainImageFile
      ? { url: mainImageFile.path, public_id: mainImageFile.filename }
      : null;

    const subImages = subImageFiles.map(file => ({
      url: file.path,
      public_id: file.filename,
    }));

    const product = await Product.create({
      title,
      slug: finalSlug,
      description,
      category,
      location,
      label,
      is_heavy,
      contact_phone,
      contact_zalo,
      quality,
      status,
      delivery_method,
      user_id, // ✅ dùng đúng user
      image_url: mainImage,
      sub_images_urls: subImages,
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("user_id").populate("category");
    if (!product) return res.status(404).json({ success: false, error: "Không tìm thấy" });
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, error: "Không tìm thấy" });

    // 🔁 Check nếu title thay đổi thì tạo lại slug mới
    let finalSlug = product.slug;
    if (req.body.title && req.body.title !== product.title) {
      let rawSlug = slugify(req.body.title, { lower: true, strict: true });
      finalSlug = rawSlug;
      let count = 1;
      while (
        await Product.findOne({
          slug: finalSlug,
          _id: { $ne: product._id }, // trừ chính sản phẩm hiện tại
        })
      ) {
        finalSlug = `${rawSlug}-${count++}`;
      }
    }

    // 🔁 Xử lý ảnh mới nếu có
    const newMainImageFile = req.files?.["image_url"]?.[0];
    const newSubImageFiles = req.files?.["sub_images_urls"] || [];

    if (newMainImageFile && product.image_url?.public_id) {
      await cloudinary.uploader.destroy(product.image_url.public_id);
    }
    if (newSubImageFiles.length && Array.isArray(product.sub_images_urls)) {
      for (const img of product.sub_images_urls) {
        if (img?.public_id) await cloudinary.uploader.destroy(img.public_id);
      }
    }

    const updatedFields = {
      ...req.body,
      slug: finalSlug, // ✅ cập nhật slug mới
      ...(newMainImageFile && {
        image_url: {
          url: newMainImageFile.path,
          public_id: newMainImageFile.filename,
        },
      }),
      ...(newSubImageFiles.length && {
        sub_images_urls: newSubImageFiles.map(file => ({
          url: file.path,
          public_id: file.filename,
        })),
      }),
    };

    const updated = await Product.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });

    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: "Không tìm thấy" });

    if (product.image_url?.public_id) {
      await cloudinary.uploader.destroy(product.image_url.public_id);
    }

    if (Array.isArray(product.sub_images_urls)) {
      for (const img of product.sub_images_urls) {
        if (img?.public_id) await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /products/my
exports.getMyProducts = async (req, res) => {
  try {
    const userId = req.user.id;

    const products = await Product.find({ user_id: userId })
      .populate("category", "title slug")
      .populate("user_id", "name avatar email")
      .sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /products/user/:userId
// GET /products/user/:userId
exports.getProductsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const products = await Product.find({ user_id: userId })
      .populate("category", "title slug")   // chỉ lấy field cần
      .populate("user_id", "name avatar email") // lấy thông tin user tạo
      .sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.getNewProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("user_id")
      .populate("category")
      .sort({ createdAt: -1 })
      .limit(8);

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
// GET /products/popular
exports.getPopularProducts = async (req, res) => {
  try {
    const products = await Product.find(  
      {status: "active",
      given_to: null,}) // chỉ lấy sản phẩm chưa cho)
      .populate("user_id")
      .populate("category")
      .sort({
        interested_count: -1, // Ưu tiên sản phẩm có lượt quan tâm cao
        view_count: -1,       // Nếu bằng nhau thì xét thêm lượt xem
      })
      .limit(8);

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("user_id")
      .populate("category")
      .sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
// GET /products/available
exports.getAvailableProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      given_to: null, // chỉ lấy sản phẩm chưa cho
    })
      .populate("user_id")
      .populate("category")
      .sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /products/given
exports.getGivenProducts = async (req, res) => {
  try {
    const products = await Product.find({
      $or: [
        { status: "given" },
        { given_to: { $ne: null } }, // có người nhận rồi
      ],
    })
      .populate("user_id")
      .populate("category")
      .populate("given_to") // để hiển thị luôn thông tin người được tặng
      .sort({ updatedAt: -1 });

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId })
      .populate("user_id")
      .populate("category")
      .sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

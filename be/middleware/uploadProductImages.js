// middleware/uploadProductImages.js
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "product_dudi_gift",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

const upload = multer({ storage });

module.exports = upload.fields([
  { name: "image_url", maxCount: 1 },
  { name: "sub_images_urls", maxCount: 5 },
]); // 👈 middleware upload nhiều file

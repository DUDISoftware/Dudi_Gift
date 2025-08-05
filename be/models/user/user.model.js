const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  address: { type: String },
  gender: {
    type: String,
    enum: ["Nam", "Nữ", "Khác"],
    default: "Khác",
  },
  dob: {
    type: Date,
  },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  avatar: {
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dcqzcxg3x/image/upload/v1754079557/anh-mo-ta_ziqcel.jpg",
    },
    public_id: { type: String },
  },
  isVerified: { type: Boolean, default: false },
  status: { type: String, enum: ["active", "suspended"], default: "active" },
  role: { type: String, enum: ["user", "admin", "partner"], default: "user" },
  googleId: { type: String },
  facebookId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);

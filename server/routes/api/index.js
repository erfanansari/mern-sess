const router = require("express").Router();

const authRoutes = require("./auth");
const userRoutes = require("./user");
const addressRoutes = require("./address");
const productRoutes = require("./product");
const categoryRoutes = require("./category");
const brandRoutes = require("./brand");
const contactRoutes = require("./contact");
const merchantRoutes = require("./merchant");
const cartRoutes = require("./cart");
const orderRoutes = require("./order");
const reviewRoutes = require("./review");
const wishlistRoutes = require("./wishlist");

// auth routes
router.use("/auth", authRoutes);

// user routes
router.use("/user", userRoutes);

// address routes
router.use("/job", addressRoutes);

// product routes
router.use("/event", productRoutes);

// category routes
router.use("/category", categoryRoutes);

// brand routes
router.use("/brand", brandRoutes);

// contact routes
router.use("/contact", contactRoutes);

// merchant routes
router.use("/merchant", merchantRoutes);

// cart routes
router.use("/cart", cartRoutes);

// order routes
router.use("/order", orderRoutes);

// Review routes
router.use("/review", reviewRoutes);

// Wishlist routes
router.use("/wishlist", wishlistRoutes);

module.exports = router;

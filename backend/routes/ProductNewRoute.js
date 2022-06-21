const express = require("express");
const {
  getAllProductsNew,
  createProductNew,
  updateProductNew,
  deleteProductNew,
  getSingleProductNew,
  createProductReviewNew,
  getSingleProductReviewsNew,
  deleteReviewNew,
} = require("../controller/ProductNewController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products/new").get(getAllProductsNew);
router.route("/product/new/new").post(createProductNew);

router
  .route("/product/review/new")
  .post(isAuthenticatedUser, createProductReviewNew);
router
  .route("/admin/products/new")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllProductsNew);
router
  .route("/product/new/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProductNew)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProductNew)
  .get(getSingleProductNew);
router
  .route("/reviews/new")
  .get(getSingleProductReviewsNew)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReviewNew);

module.exports = router;

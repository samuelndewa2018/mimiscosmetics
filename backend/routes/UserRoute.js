const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  userDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  subscibeNewsletter,
  contactsForm,
  receiveOrder,
  receiveUserOrder,
  receiveUserRegister,
} = require("../controller/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/registration").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update/info").put(isAuthenticatedUser, updateProfile);
router.route("/me").get(isAuthenticatedUser, userDetails);
router.route("/api/receive/email").post(subscibeNewsletter);
router.route("/contact/form").post(contactsForm);
router.route("/receive/order").post(receiveOrder);
router.route("/receive/order/user").post(receiveUserOrder);
router.route("/receive/register/user").post(receiveUserRegister);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(getSingleUser)
  .put(updateUserRole)
  .delete(deleteUser);

module.exports = router;

const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken.js");
const sendMail = require("../utils/sendMail.js");
const crypto = require("crypto");
const mg = require("mailgun-js");
const cloudinary = require("cloudinary");

// Register user => /api/v2/register
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 200, res);
});

// Login User => /api/v2/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter your email & password", 400));
  }

  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("User is not found with this email or password", 401)
    );
  }

  // check if the user is correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("User is not find with this email or password", 401)
    );
  }

  sendToken(user, 201, res);
});

//  Log out user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Log out success",
  });
});

// Forgot password => /api/v2/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({
    validateBeforeSave: false,
  });

  // create reset password url
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is : \n\n ${resetPasswordUrl}\n\n If you have not requested this email, then please ignore it. \n \n Thank you for shopping with Bramuels`;

  try {
    await sendMail({
      email: user.email,
      subject: `Mimiscosmetics Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}. Check Email to reset your password`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password => /api/v2/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Create Token hash url
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset password url is invalid or has been expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  // set up new Password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//  Get user Details => /api/v1/me
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update/change User Password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  //check previous user Password
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password not matched with each other", 400));
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

// Update User Profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
/// Admin routes----------------------------------------------------------------
// Get All users => api/v2/admin/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single User Details => api/v2/admin/users/: id
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User is not found with this id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Change user Role => /api/v2/admin/user/: id
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete User => api/v2/admin/users/: id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  if (!user) {
    return next(
      new ErrorHandler(`User is not found with this id: ${req.params.id}`, 400)
    );
  }
  // removing the user
  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// receive email for NewsLetter => /api/v2/receive/email
exports.subscibeNewsletter = catchAsyncErrors(async (req, res, next) => {
  const { message } = req.body;

  try {
    await sendMail({
      email: `samuelndewa2018@gmail.com`,
      subject: `Subscription to News Letter`,
      message: ` Hello Mimiscosmetics,\n\n This is a New User \n\n Please add " ${message} " to NewsLetter`,
    });

    res.status(200).json({
      success: true,
      message: "Email succesfully sent. We will reply soon.",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// receive email from contacts => /api/v2/receive/email
exports.contactsForm = catchAsyncErrors(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  try {
    await sendMail({
      email: `samuelndewa2018@gmail.com`,
      subject: `Contact Us or Report Us`,
      message: ` Hello Mimiscosmetics,\n Name: ${name} \n Email: ${email}, \n Subject: ${subject}\n Complains/Request: ${message}`,
    });

    res.status(200).json({
      success: true,
      message: "Email succesfully sent. We will reply soon.",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// receive email to user => /api/v2/receive/order/user
exports.receiveUserOrder = catchAsyncErrors(async (req, res, next) => {
  const { email, message } = req.body;

  try {
    await sendMail({
      email: email,
      subject: `Order Confirmation`,
      message: message,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// receive email for order when ordered => /api/v2/receive/order
exports.receiveOrder = catchAsyncErrors(async (req, res, next) => {
  const { message } = req.body;

  try {
    await sendMail({
      email: `samuelndewa2018@gmail.com`,
      subject: `New Order`,
      message: `Message: ${message}`,
    });

    res.status(200).json({
      success: true,
      message: "Order has been succesfully received.",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// receive email to user when registered => /api/v2/receive/register/user
exports.receiveUserRegister = catchAsyncErrors(async (req, res, next) => {
  const { email, message } = req.body;

  try {
    await sendMail({
      email: email,
      subject: `Welcome to Mimiscosmetics`,
      message: message,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

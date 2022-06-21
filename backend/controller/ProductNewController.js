const ProductNew = require("../models/ProductNewModel.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Features = require("../utils/Features");
const cloudinary = require("cloudinary");

// create Product => /api/v2/admin/product/new
exports.createProductNew = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images?.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "productsNew",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  // req.body.user = req.user._id; //  req.body.user = req.user.id ==> todo what it does... comment it out to add product

  const productNew = await ProductNew.create(req.body);

  res.status(201).json({
    success: true,
    productNew,
  });
});

// get All Products => /api/v2/products
exports.getAllProductsNew = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 16;

  const productsCount = await ProductNew.countDocuments();

  const feature = new Features(ProductNew.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const productsNew = await feature.query;
  res.status(200).json({
    success: true,
    productsNew,
    productsCount,
    resultPerPage,
  });
});

// Update Product => /api/v1/admin/product/:id
exports.updateProductNew = catchAsyncErrors(async (req, res, next) => {
  let productNew = await ProductNew.findById(req.params.id);
  if (!productNew) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Delete image from cloudinary
    for (let i = 0; i < productNew.images.length; i++) {
      await cloudinary.v2.uploader.destroy(productNew.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }

  productNew = await ProductNew.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    productNew,
  });
});

// delete Product
exports.deleteProductNew = catchAsyncErrors(async (req, res, next) => {
  const productNew = await ProductNew.findById(req.params.id);

  if (!productNew) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  // Deleting images from cloudinary
  for (let i = 0; 1 < productNew.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      productNew.images[i].public_id
    );
  }

  await productNew.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted succesfully",
  });
});

// single Product details
exports.getSingleProductNew = catchAsyncErrors(async (req, res, next) => {
  const productNew = await ProductNew.findById(req.params.id);
  if (!productNew) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    productNew,
  });
});

// Create New Review or Update the review
exports.createProductReviewNew = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    email: req.user.email,
    rating: Number(rating),
    comment,
    url: req.user.avatar.url,
  };

  const productNew = await ProductNew.findById(productId);

  const isReviewed = productNew.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    productNew.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    productNew.reviews.push(review);
    productNew.numOfReviews = productNew.reviews.length;
  }

  let avg = 0;

  productNew.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  productNew.ratings = avg / productNew.reviews.length;

  await productNew.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All reviews of a single product
exports.getSingleProductReviewsNew = catchAsyncErrors(
  async (req, res, next) => {
    const productNew = await ProductNew.findById(req.query.id);

    if (!productNew) {
      return next(new ErrorHandler("Product is not found with this id", 404));
    }

    res.status(200).json({
      success: true,
      reviews: productNew.reviews,
    });
  }
);

// Delete Review --Admin
exports.deleteReviewNew = catchAsyncErrors(async (req, res, next) => {
  const productNew = await ProductNew.findById(req.query.productId);

  if (!productNew) {
    return next(new ErrorHandler("Product not found with this id", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await ProductNew.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

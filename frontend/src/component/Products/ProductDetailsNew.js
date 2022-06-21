import BottomTab from "../../more/BottomTab";
import Loading from "../../more/Loader";
import Footer from "../footer/Footer";
import MetaData from "../../more/Metadata";
import Header from "../Home/Header";
import ReviewCard from "./ReviewCard.js";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Rating } from "@material-ui/lab";
import { ToastContainer, toast } from "react-toastify";
import { addItemsToCartNew } from "../../actions/CartAction";
import { addFavouriteItemsToCart } from "../../actions/FavouriteAction";
import { NEW_REVIEWNEW_RESET } from "../../constans/ProductNewConstans";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorsNew,
  getProductDetailsNew,
  newReviewNew,
} from "../../actions/ProductNewActions";
import "./Productdetails.css";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailsNew = ({ match, history }) => {
  const dispatch = useDispatch();
  const { productNew, loading, error } = useSelector(
    (state) => state.productDetailsNew
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    const myFormNew = new FormData();

    myFormNew.set("rating", rating);
    myFormNew.set("comment", comment);
    myFormNew.set("productId", match.params.id);

    isAuthenticated !== true ? history.push(`/login?redirect=/`) : <></>;

    dispatch(newReviewNew(myFormNew));

    comment.length === 0
      ? toast.error("Please fill the comment box")
      : toast.success("Review done successfully reload to watch it");

    dispatch({ type: NEW_REVIEWNEW_RESET });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorsNew());
    }
    dispatch(getProductDetailsNew(match.params.id));
  }, [dispatch, match.params.id, error]);

  const options = {
    value: productNew.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (productNew.Stock <= quantity)
      return toast.error("Product stock limited");
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const addToCartHandler = () => {
    if (productNew.Stock > 0) {
      dispatch(addItemsToCartNew(match.params.id, quantity));
      toast.success("Product Added to cart");
    } else {
      toast.error("Product stock limited");
    }
  };
  const addToFavouriteHandler = () => {
    dispatch(addFavouriteItemsToCart(match.params.id, quantity));
    toast.success("Product Added to Favourites");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${productNew.name}`} />
          <Header />
          <div className="ProductDetails">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {productNew.images &&
                  productNew.images.map((item, i) => (
                    <Carousel.Item key={i}>
                      <img
                        className="d-block w-100 CarouselImage"
                        src={item.url}
                        alt={productNew.title}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
            <div className="varse__2">
              <div className="detailsBlock-1">
                <h2>{productNew.name}</h2>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span>({productNew.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock">
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h1>{`Kshs.${productNew.price}`}</h1>
                  <h1 className="discountPrice">
                    {productNew.offerPrice > 0
                      ? `Kshs.${productNew.offerPrice}`
                      : ""}
                  </h1>
                </div>
                <div className="detailsBlock-3-1">
                  <span className="quantity">
                    <strong>Quantity</strong>
                  </span>
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" readOnly value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                </div>
                <p className="stock__meta">
                  <b
                    className={productNew.Stock < 1 ? "redColor" : "greenColor"}
                  >
                    {productNew.Stock < 1 ? "Out Of Stock" : "InStock "}
                  </b>
                  <p style={{ marginLeft: "5px" }}>
                    {productNew.Stock < 1
                      ? "(0 remaining)"
                      : `(${productNew.Stock} remaining)`}
                  </p>
                </p>
                <div
                  className="Description"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span>
                    <strong>Description:</strong>
                  </span>
                  <p>{productNew.description}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="wishlist"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "15px 5px",
                    }}
                    onClick={addToFavouriteHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                    </svg>
                    <span
                      className="cartBtn"
                      style={{ opacity: 0.7, padding: "0px 5px" }}
                    >
                      Add to wishlist
                    </span>
                  </div>

                  <div
                    className="pointer flex"
                    style={{
                      padding: "0 5px",
                      borderRadius: "10px",
                      alignItems: "center",
                      backgroundColor: "#E4EAEC",
                    }}
                    onClick={addToCartHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-bag"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                    <p className="cartBtn">Add to Cart</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="reviews__heading">
            <h1
              style={{
                padding: "5px 30px",
                opacity: 1,
                borderBottom: "1px solid #999",
                fontFamily: "Poppins,sans-serif",
              }}
            >
              Reviews
            </h1>
          </div>
          <div>
            <div
              style={{
                padding: "1vmax",
              }}
            >
              {productNew.reviews && productNew.reviews[0] ? (
                <div className="review__option">
                  {productNew.reviews &&
                    productNew.reviews.map((review, i) => (
                      <ReviewCard key={i} review={review} />
                    ))}
                </div>
              ) : (
                <p
                  className="noReviews"
                  style={{
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  No Reviews Yet *
                </p>
              )}
              <div
                style={{
                  padding: "0px 2vmax",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "1.8vmax",
                    fontWeight: "700",
                    lineHeight: 1,
                    letterSpacing: "-.0125em",
                    color: "#222",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  Add a Review
                </span>
                <div
                  style={{
                    margin: "1vmax 0",
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "#222",
                        fontFamily: "Poppins,sans-serif",
                        padding: "1vmax 0",
                      }}
                    >
                      Your Rating*
                    </span>
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      size="large"
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    ></div>
                  </div>
                </div>
                <textarea
                  cols="30"
                  rows="6"
                  placeholder="Comment *"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="ReviewsSectionInput"
                ></textarea>
                <p
                  type="submit"
                  style={{
                    width: "18vmax",
                    margin: "1vmax 0px",
                    fontFamily: "sans-serif",
                    padding: "10px 15px",
                    background: "#3BB77E",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                    textAlign: "center",
                    borderRadius: "5px",
                  }}
                  onClick={reviewSubmitHandler}
                >
                  Submit
                </p>
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            outline={false}
          />
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default ProductDetailsNew;

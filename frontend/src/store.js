import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/CartReducer";
import { favouriteReducer } from "./reducers/FavouriteReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";

import {
  deleteProductReducer,
  deleteReviewReducer,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReviewsReducer,
  productsReducer,
} from "./reducers/ProductReducer";
import {
  deleteProductNewReducer,
  deleteReviewNewReducer,
  newProductNewReducer,
  newReviewNewReducer,
  productDetailsNewReducer,
  productReviewsNewReducer,
  productsNewReducer,
} from "./reducers/ProductNewReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/OrderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productsNew: productsNewReducer,
  productDetails: productDetailsReducer,
  productDetailsNew: productDetailsNewReducer,
  user: userReducer,
  profile: profileReducer,
  cart: cartReducer,
  favourite: favouriteReducer,
  order: newOrderReducer,
  myOrder: myOrdersReducer,
  myOrderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newReviewNew: newReviewNewReducer,
  createProduct: newProductReducer,
  createProductNew: newProductNewReducer,
  deleteProduct: deleteProductReducer,
  deleteProductNew: deleteProductNewReducer,
  AllOrders: allOrdersReducer,
  deleteOrder: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  deleteReview: deleteReviewReducer,
  deleteReviewNew: deleteReviewNewReducer,
  productReviews: productReviewsReducer,
  productReviewsNew: productReviewsNewReducer,
  forgotPassword: forgotPasswordReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  favourite: {
    favouriteItems: localStorage.getItem("favouriteItems")
      ? JSON.parse(localStorage.getItem("favouriteItems"))
      : [],
  },
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;

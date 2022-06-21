import axios from "axios";
import {
  ADMIN_PRODUCTNEW_FAIL,
  ADMIN_PRODUCTNEW_REQUEST,
  ADMIN_PRODUCTNEW_SUCCESS,
  ALL_PRODUCTNEW_FAIL,
  ALL_PRODUCTNEW_REQUEST,
  ALL_PRODUCTNEW_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCTNEW_FAIL,
  DELETE_PRODUCTNEW_REQUEST,
  DELETE_PRODUCTNEW_SUCCESS,
  DELETE_REVIEWNEW_FAIL,
  DELETE_REVIEWNEW_REQUEST,
  DELETE_REVIEWNEW_SUCCESS,
  NEW_PRODUCTNEW_FAIL,
  NEW_PRODUCTNEW_REQUEST,
  NEW_PRODUCTNEW_SUCCESS,
  NEW_REVIEWNEW_FAIL,
  NEW_REVIEWNEW_REQUEST,
  NEW_REVIEWNEW_SUCCESS,
  PRODUCTNEW_DETAILS_FAIL,
  PRODUCTNEW_DETAILS_REQUEST,
  PRODUCTNEW_DETAILS_SUCCESS,
  UPDATE_PRODUCTNEW_FAIL,
  UPDATE_PRODUCTNEW_REQUEST,
  UPDATE_PRODUCTNEW_SUCCESS,
  ALL_REVIEWNEW_REQUEST,
  ALL_REVIEWNEW_SUCCESS,
  ALL_REVIEWNEW_FAIL,
} from "../constans/ProductNewConstans";

// get all products
export const getProductNew =
  (keyword = "", currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCTNEW_REQUEST,
      });

      let link = `/api/v2/products/new?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `/api/v2/products/new?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCTNEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTNEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Products Details
export const getProductDetailsNew = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTNEW_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v2/product/new/${id}`);

    dispatch({
      type: PRODUCTNEW_DETAILS_SUCCESS,
      payload: data.productNew,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTNEW_DETAILS_FAIL,
      payload: error.response.message,
    });
  }
};

// NEW REVIEW
export const newReviewNew = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEWNEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v2/product/review/new`,
      reviewData,
      config
    );

    dispatch({
      type: NEW_REVIEWNEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEWNEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product --------Admin
export const createProductNew = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCTNEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v2/product/new/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCTNEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCTNEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Admin Products -----Admin
export const getAdminProductNew = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTNEW_REQUEST });

    const { data } = await axios.get("/api/v2/admin/products/new");

    dispatch({
      type: ADMIN_PRODUCTNEW_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTNEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product ------Admin
export const deleteProductNew = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCTNEW_REQUEST });

    const { data } = await axios.delete(`/api/v2/product/new/${id}`);

    dispatch({
      type: DELETE_PRODUCTNEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCTNEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProductNew = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCTNEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v2/product/new/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCTNEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCTNEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviewsNew = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEWNEW_REQUEST });

    const { data } = await axios.get(`/api/v2/reviews/new?id=${id}`);

    dispatch({
      type: ALL_REVIEWNEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEWNEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product ------ Admin
export const deleteReviewsNew = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEWNEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v2/reviews/new?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEWNEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEWNEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//   Clearing errors
export const clearErrorsNew = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

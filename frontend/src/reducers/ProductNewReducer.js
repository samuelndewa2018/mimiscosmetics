import {
  ALL_PRODUCTNEW_FAIL,
  ALL_PRODUCTNEW_REQUEST,
  ALL_PRODUCTNEW_SUCCESS,
  CLEAR_ERRORS,
  PRODUCTNEW_DETAILS_FAIL,
  PRODUCTNEW_DETAILS_REQUEST,
  PRODUCTNEW_DETAILS_SUCCESS,
  NEW_REVIEWNEW_REQUEST,
  NEW_REVIEWNEW_SUCCESS,
  NEW_REVIEWNEW_RESET,
  NEW_REVIEWNEW_FAIL,
  ADMIN_PRODUCTNEW_REQUEST,
  ADMIN_PRODUCTNEW_SUCCESS,
  ADMIN_PRODUCTNEW_FAIL,
  NEW_PRODUCTNEW_REQUEST,
  NEW_PRODUCTNEW_SUCCESS,
  NEW_PRODUCTNEW_FAIL,
  NEW_PRODUCTNEW_RESET,
  DELETE_PRODUCTNEW_REQUEST,
  UPDATE_PRODUCTNEW_REQUEST,
  DELETE_PRODUCTNEW_SUCCESS,
  UPDATE_PRODUCTNEW_SUCCESS,
  DELETE_PRODUCTNEW_FAIL,
  UPDATE_PRODUCTNEW_FAIL,
  DELETE_PRODUCTNEW_RESET,
  UPDATE_PRODUCTNEW_RESET,
  DELETE_REVIEWNEW_REQUEST,
  DELETE_REVIEWNEW_SUCCESS,
  DELETE_REVIEWNEW_FAIL,
  DELETE_REVIEWNEW_RESET,
  ALL_REVIEWNEW_REQUEST,
  ALL_REVIEWNEW_SUCCESS,
  ALL_REVIEWNEW_FAIL,
} from "../constans/ProductNewConstans";

export const productsNewReducer = (state = { productsNew: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTNEW_REQUEST:
    case ADMIN_PRODUCTNEW_REQUEST:
      return {
        loading: true,
        productsNew: [],
      };
    case ALL_PRODUCTNEW_SUCCESS:
      return {
        loading: false,
        productsNew: action.payload.productsNew,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };

    case ADMIN_PRODUCTNEW_SUCCESS:
      return {
        loading: false,
        productsNew: action.payload,
      };

    case ALL_PRODUCTNEW_FAIL:
    case ADMIN_PRODUCTNEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailsNewReducer = (
  state = { productNew: {} },
  action
) => {
  switch (action.type) {
    case PRODUCTNEW_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCTNEW_DETAILS_SUCCESS:
      return {
        loading: false,
        productNew: action.payload,
      };
    case PRODUCTNEW_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Product review
export const newReviewNewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEWNEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEWNEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEWNEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEWNEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// New Product ----Admin
export const newProductNewReducer = (state = { productNew: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCTNEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCTNEW_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        productNew: action.payload.product,
      };
    case NEW_PRODUCTNEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCTNEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Delete Product
export const deleteProductNewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCTNEW_REQUEST:
    case UPDATE_PRODUCTNEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCTNEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PRODUCTNEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_PRODUCTNEW_FAIL:
    case UPDATE_PRODUCTNEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCTNEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCTNEW_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// All reviews --- Admin
export const productReviewsNewReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEWNEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEWNEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEWNEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Delete Review ----- Admin
export const deleteReviewNewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEWNEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEWNEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEWNEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEWNEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

import * as Types from "../ActionTypes/product.action.types";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case Types.GET_PRODUCT_LOADING:
      case Types.ADMIN_PRODUCT_REQUEST :
      return { loading: true, products: [] };

    case Types.GET_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage : action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };

    case Types.ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload
      };

    case Types.GET_PRODUCT_ERROR:
      case Types.ADMIN_PRODUCT_FAIL:
      return { loading: false, error: action.payload };

    case Types.GET_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const productDetailsReducer = (state =  { product: {} } , action) => {
  switch (action.type) {
    case Types.GET_PRODUCT_DETAILED_LOADING:
      return {  ...state,loading: true };

    case Types.GET_PRODUCT_DETAILED_SUCCESS:
      return {
        loading: false,
        product: action.payload
      };

    case Types.GET_PRODUCT_DETAILED_ERROR:
      return { loading: false, error: action.payload };

    case Types.GET_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case Types.NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: action.payload,
      };
    case Types.NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Types.NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
      
    default:
      return state;
  }
};

export const productUpdateAndDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.DELETE_PRODUCT_REQUEST:
    case Types.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case Types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case Types.DELETE_PRODUCT_FAIL:
    case Types.UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Types.DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case Types.UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    default:
      return state;
  }
};


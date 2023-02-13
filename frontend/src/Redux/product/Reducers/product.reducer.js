import * as Types from "../ActionTypes/product.action.types";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case Types.GET_PRODUCT_LOADING:
      return { loading: true, products: [] };

    case Types.GET_PRODUCT_SUCCESS:
      return {
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage : action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
        loading: false,
      };

    case Types.GET_PRODUCT_ERROR:
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
      return { loading: true, ...state };

    case Types.GET_PRODUCT_DETAILED_SUCCESS:
      return {
        product: action.payload,
        loading: false,
      };

    case Types.GET_PRODUCT_DETAILED_ERROR:
      return { loading: false, error: action.payload };

    case Types.GET_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};


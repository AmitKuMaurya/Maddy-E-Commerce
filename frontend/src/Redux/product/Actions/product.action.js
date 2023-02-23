import * as Types from "../ActionTypes/product.action.types";
import axios from "axios";

// currentPage = 1,price=[0,10000],ratings=0
export const getProducts = ( currentPage = 1, price = [0, 10000], category, ratings = 0) => async(dispatch) =>{
    try{
        dispatch({ type : Types.GET_PRODUCT_LOADING});

        let link =`http://localhost:8080/api/v1/products`;

        // if(currentPage || price || ratings){
        //   link = `http://localhost:8080/api/v1/products?page=${currentPage}&ratings[gte]=${ratings}&price[gte]=${price[0]}&price[lte]=${price[1]}`
        // }
        // ?
        if(category){
          link = `http://localhost:8080/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        const {data} = await axios.get(link);
        // console.log(data)
        dispatch({ type : Types.GET_PRODUCT_SUCCESS,
        payload:data
    }) 

    } catch(error){
        dispatch({ type: Types.GET_PRODUCT_ERROR,
        payload : error.response.data.message
        })
    }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: Types.GET_PRODUCT_DETAILED_LOADING });
  
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/${id}`);
  
      dispatch({
        type: Types.GET_PRODUCT_DETAILED_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: Types.GET_PRODUCT_DETAILED_ERROR,
        payload: error.response.data.message,
      });
      console.log(error)
    }
  };

// create any product which is done by Admin only
  export const createNewProduct = (productData,token) => async (dispatch) => {
    try {
      dispatch({ type: Types.NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'authorization': `Bearer ${token}`
        },
      };
      console.log("token :",token);
  
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/admin/product/new`,
        productData,
        config
      );
  
      dispatch({
        type: Types.NEW_PRODUCT_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: Types.NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
      console.log(error);
    }
  };

  // Get All Products For Admin
  export const getAdminProduct = (token) => async (dispatch) => {
    try {
      dispatch({ type: Types.ADMIN_PRODUCT_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          'authorization': `Bearer ${token}`
        },
      };
  
      const { data } = await axios.get("http://localhost:8080/api/v1/admin/products",config);
  
      dispatch({
        type: Types.ADMIN_PRODUCT_SUCCESS,
        payload: data.products,
      });
    } catch (error) {
      dispatch({
        type: Types.ADMIN_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
      // console.log(error);
    }
  };

  
  // Delete Product by admin
export const deleteProduct = (id,token) => async (dispatch) => {
  try {
    dispatch({ type: Types.DELETE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    };
    
    const { data } = await axios.delete(`http://localhost:8080/api/v1/admin/product/${id}`,config);

    dispatch({
      type: Types.DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update an product by admin.


export const updateProduct = (id,productData,token) => async (dispatch) => {
  try {
    dispatch({ type: Types.UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
      "Content-Type": "multipart/form-data", 
      'authorization': `Bearer ${token}`
      },
    };

    const { data } = await axios.put(
      `http://localhost:8080/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: Types.UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
    console.log(error);
  }
};
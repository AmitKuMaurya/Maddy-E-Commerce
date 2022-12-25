import * as Types from "../ActionTypes/product.action.types";
import axios from "axios";

export const getProducts = () =>async (dispatch) =>{
    try{
        dispatch({ type : Types.GET_PRODUCT_LOADING});

        const {data} = await axios.get("http://localhost:8080/api/v1/products");
        console.log(data)
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
    }
  };

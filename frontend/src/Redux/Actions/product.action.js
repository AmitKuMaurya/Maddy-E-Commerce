import * as Types from "../ActionTypes/product.action.types";
import axios from "axios";

// currentPage = 1,price=[0,10000],ratings=0
export const getProducts = ( currentPage = 1, price = [0, 10000], category, ratings = 0) => async(dispatch) =>{
    try{
        dispatch({ type : Types.GET_PRODUCT_LOADING});

        let link =`http://localhost:8080/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        
        if(category){
          link = `http://localhost:8080/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        const {data} = await axios.get(link);
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

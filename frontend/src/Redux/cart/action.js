import * as types from "./action.types";
import axios from "axios";

export const addItemsToCart = (id,quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `http://localhost:8080/api/v1/product/${id}`
  );

  dispatch({
    type: types.ADD_TO_CART,
    payload: {
      // userId : _id,
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: types.REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: types.SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
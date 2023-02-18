import * as types from "./actionTypes.order"
import axios from "axios";
export const createOrder = (order) => async (dispatch) => {
    try {
      dispatch({ type: types.CREATE_ORDER_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("http://localhost:8080/api/v1/order/new", order, config);
  
      dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: types.CREATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // My Orders
  export const myOrders = () => async (dispatch) => {
    try {
      dispatch({ type: types.MY_ORDERS_REQUEST });
  
      const { data } = await axios.get("http://localhost:8080/api/v1/orders/me");
  
      dispatch({ type: types.MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: types.MY_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get All Orders (admin)
  export const getAllOrders = () => async (dispatch) => {
    try {
      dispatch({ type: types.ALL_ORDERS_REQUEST });
  
      const { data } = await axios.get("http://localhost:8080/api/v1/admin/orders");
  
      dispatch({ type: types.ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: types.ALL_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Update Order
  export const updateOrder = (id, order) => async (dispatch) => {
    try {
      dispatch({ type: types.UPDATE_ORDER_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/admin/order/${id}`,
        order,
        config
      );
  
      dispatch({ type: types.UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: types.UPDATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Order
  export const deleteOrder = (id) => async (dispatch) => {
    try {
      dispatch({ type: types.DELETE_ORDER_REQUEST });
  
      const { data } = await axios.delete(`http://localhost:8080/api/v1/admin/order/${id}`);
  
      dispatch({ type: types.DELETE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: types.DELETE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get Order Details
  export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: types.ORDER_DETAILS_REQUEST });
  
      const { data } = await axios.get(`http://localhost:8080/api/v1/order/${id}`);
  
      dispatch({ type: types.ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
      dispatch({
        type: types.ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
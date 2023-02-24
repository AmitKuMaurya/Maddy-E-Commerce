import * as types from "./actionTypes.order";
import axios from "axios";
import { BASE_URL } from "../../index";
export const createNewOrder = (orderObj,token) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/order/new`,
      orderObj,
      config
    );
    console.log(data);
    console.log(orderObj);
     dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
    console.log(error);
  }
};

// My Orders
export const myOrders = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.MY_ORDERS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    };
    const { data } = await axios.get(`${BASE_URL}/order/me`,config);

    dispatch({ type: types.MY_ORDERS_SUCCESS, payload: data.orders });
    console.log(data);

  } catch (error) {
    dispatch({
      type: types.MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
    console.log(error);
  }
};

// Get Order Details
export const getOrderDetails = (id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.ORDER_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/order/${id}`,
      config
    );

    dispatch({ type: types.ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: types.ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Get All Orders (admin)
export const getAllOrders = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.ALL_ORDERS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/admin/orders`,
      config
    );

    dispatch({ type: types.ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: types.ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateOrder = (id, order,token) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    };
    const { data } = await axios.put(
      `${BASE_URL}/admin/order/${id}`,
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
export const deleteOrder = (id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    };

    const { data } = await axios.delete(
      `${BASE_URL}/admin/order/${id}`,
      config
    );

    dispatch({ type: types.DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: types.DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
    console.log(error);
  }
};



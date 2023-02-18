import * as types from "./actionTypes.order"

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case types.CREATE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case types.CREATE_ORDER_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
  
      case types.CREATE_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case types.CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case types.MY_ORDERS_REQUEST:
        return {
          loading: true,
        };
  
      case types.MY_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload,
        };
  
      case types.MY_ORDERS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case types.CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case types.ALL_ORDERS_REQUEST:
        return {
          loading: true,
        };
  
      case types.ALL_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload,
        };
  
      case types.ALL_ORDERS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case types.CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const orderReducer = (state = {}, action) => {
    switch (action.type) {
      case types.UPDATE_ORDER_REQUEST:
      case types.DELETE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case types.UPDATE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case types.DELETE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case types.UPDATE_ORDER_FAIL:
      case types.DELETE_ORDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case types.UPDATE_ORDER_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
      case types.DELETE_ORDER_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case types.CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
      case types.ORDER_DETAILS_REQUEST:
        return {
          loading: true,
        };
  
      case types.ORDER_DETAILS_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
  
      case types.ORDER_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case types.CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
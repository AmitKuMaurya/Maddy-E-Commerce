import { loadData, saveData } from "../../components/utility/SetCookie";
import * as types from "./user.action.types";
const token = loadData("token");

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case types.USER_LOGIN_LOADING:
    case types.USER_REGISTER_LOADING:
    case types.USER_PERSIST_LOADING:
      return { loading: true, isAuth: false };

    case types.USER_LOGIN_SUCCESS:
    case types.USER_REGISTER_SUCCESS:
    case types.USER_PERSIST_SUCCESS:
      saveData("token",action.payload)
      return {
        ...state,
        loading: false,
        isAuth: true,
        jwtToken: action.payload,
      };

    case types.USER_LOGIN_FAILED:
    case types.USER_REGISTER_FAILED:
      return {
        loading: false,
        isAuth: false,
        jwtToken: null,
        error: action.payload,
      };

    case types.USER_PERSIST_FAILED:
      return {
        loading: false,
        isAuth: false,
        jwtToken: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

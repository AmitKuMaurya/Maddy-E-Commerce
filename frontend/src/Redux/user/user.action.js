import * as types from "./user.action.types";
import axios from "axios";
// import Cookies from "js-cookie";
import { saveData } from "../../components/utility/SetCookie";
// import setCookie from "../../components/utility/SetCookie";

export const login = (email, password) => async (dispatch) => {
  try {

    dispatch({ type: types.USER_LOGIN_LOADING });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `http://localhost:8080/api/v1/login`,
      { email, password },
      config,
    );
    saveData("token",data.token)
    // saveData("user-Detail",data.user);
     dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data.user});
  } catch (error) {
     dispatch({
      type: types.USER_LOGIN_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_REGISTER_LOADING });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `http://localhost:8080/api/v1/register`,
      userData,
      config
    );
    dispatch({ type: types.USER_REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: types.USER_REGISTER_FAILED,
      payload: error.response.data.message,
    });
  }
};


export const logout = () => async (dispatch) => {
  try {
    await axios.get(`http://localhost:8080/api/v1/logout`);

    dispatch({ type: types.LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: types.LOGOUT_FAIL, payload: error.response.data.message });
  }
};


export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`http://localhost:8080/api/v1/me/update`, userData, config);

     dispatch({ type: types.UPDATE_PROFILE_SUCCESS, payload: data.success });
     console.log(data);
     console.log(data.success);
  } catch (error) {
    dispatch({
      type: types.UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};
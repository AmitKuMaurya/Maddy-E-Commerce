import * as types from "./user.action.types";
import axios from "axios";
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
    console.log(data.token);
    return dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data.token });
  } catch (error) {
    return dispatch({
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

export const persistUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.USER_PERSIST_LOADING });

    const { data } = await axios.get(`http://localhost:8080/api/v1/me`);

    dispatch({ type: types.USER_PERSIST_SUCCESS, payload: data.user });
    // console.log(data.user)
  } catch (error) {
    dispatch({
      type: types.USER_PERSIST_FAILED,
      payload: error.response.data.message,
    });
  }
};

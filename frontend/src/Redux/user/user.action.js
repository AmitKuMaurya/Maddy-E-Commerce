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
    saveData("token",data.token);
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


// export const updateProfile = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: types.UPDATE_PROFILE_REQUEST });

//     const config = { headers: { "Content-Type": "multipart/form-data" } };
//     console.log(userData);
//     const { data } = await axios.put(`http://localhost:8080/api/v1/me/update`, userData, config);

//      dispatch({ type: types.UPDATE_PROFILE_SUCCESS, payload: data.success });
//      console.log(data);
//      console.log(data.success);
//   } catch (error) {
//     dispatch({
//       type: types.UPDATE_PROFILE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// export const updatePassword = (passwords) => async (dispatch) => {
//   try {
//     dispatch({ type: types.UPDATE_PASSWORD_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.put(
//       `http://localhost:8080/api/v1/password/update`,
//       passwords,
//       config
//     );

//     dispatch({ type: types.UPDATE_PASSWORD_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: types.UPDATE_PASSWORD_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };


export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: types.FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`http://localhost:8080/api/v1/password/forgot`, email, config);

    dispatch({ type: types.FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: types.FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: types.RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `http://localhost:8080/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: types.RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: types.RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get All Users
export const getAllUsers = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.ALL_USERS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    };

    const { data } = await axios.get(`http://localhost:8080/api/v1/admin/users`,config);

    dispatch({ type: types.ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: types.ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// get  User Details
export const getUserDetails = (id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    };

    const { data } = await axios.get(`http://localhost:8080/api/v1/admin/user/${id}`,config);

    dispatch({ type: types.USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: types.USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
export const updateUser = (id,userData,token) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    };

    const { data } = await axios.put(
      `http://localhost:8080/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: types.UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: types.UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id,token) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    };

    const { data } = await axios.delete(`http://localhost:8080/api/v1/admin/user/${id}`,config);

    dispatch({ type: types.DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
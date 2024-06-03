import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CLEAR_ERROR
  } from '../Redux/constants/userDataConstants'
  import axiosInstance from '../axiosInstance/axiosInstance'
  let config = {
    headers: { 'Content-Type': 'application/json' },
  }
  
  //login
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST, })
      const config = { headers: { "Content-Type": "application/json" } }
      const  data  = await axiosInstance.post(`/user/loginUser`, { email, password }, config)
      console.log(data.data);
      dispatch({ type: LOGIN_SUCCESS, payload: data.data.user })
    } catch (error) {
      // console.log(error);
      dispatch({ type: LOGIN_FAIL, payload: error.message })
    }
  }
  //Register
  export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
      const config = { Headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axiosInstance.post("/api/user/register", userData, config);
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  //LoadUser
  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST, })
      const  data  = await axiosInstance.get(`/user/me`,config)
      // console.log(data.data)
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.data.user })
    } catch (error) {
      console.error(error);
      dispatch({ type: LOAD_USER_FAIL, payload: error.message })
    }
  }
  export const logout = () => async (dispatch) => {
    // console.log("enter");
    try {
      await axiosInstance.post(`/user/logout`).then((response) => {
        console.log(response);
        if (response) {
          dispatch({ type: LOGOUT_SUCCESS })
          // console.log('logged out')
        }
      })
    } catch (error) {
      console.error(error);
      dispatch({ type: LOGOUT_FAIL, payload: error.message })
    }
  }

  
  
  export const updateProfile = (myForm) => async (dispatch) => {
    console.log([...myForm]);
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
  
      const config = { Headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axiosInstance.put("/user/editUserDetail", myForm, config);
  
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const updatePassword = (passwords) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
  
      const config = { Headers: { "Content-Type": "application/json" } };
  
      const { data } = await axiosInstance.put(
        "/api/user/password/update",
        passwords,
        config
      );
  
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.status });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
  
      const config = { Headers: { "Content-Type": "application/json" } };
  
      const { data } = await axiosInstance.post(
        "/api/user/password/forgot",
        email,
        config
      );
  
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
  
      const config = { Headers: { "Content-Type": "application/json" } };
  
      const { data } = await axiosInstance.put(
        `/api/user/password/reset/${token}`,
        passwords,
        config
      );
  
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.status });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
  };
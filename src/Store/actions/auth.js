import * as actionTypes from "./actions";
import axios from "axios";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const checkAuthTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};
export const auth = (mail, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const data = {
      email: mail,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEkcMrjubkcDYv53NnTazbOykXPD_Q4M0";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEkcMrjubkcDYv53NnTazbOykXPD_Q4M0";
    }
    axios
      .post(url, data)
      .then((resp) => {
        const expirationDate = new Date(
          new Date().getTime() + resp.data.expiresIn * 1000
        );
        localStorage.setItem("token", resp.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", resp.data.localId);
        dispatch(authSuccess(resp.data));
        dispatch(checkAuthTimeOut(resp.data.expiresIn));
      })
      .catch((err) => dispatch(authFail(err.response.data.error)));
  };
};
export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess({idToken:token,localId:userId}));
        dispatch(
          checkAuthTimeOut(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(authLogout());
      }
    }
  };
};

import axios from "axios";
import * as actionTypes from "./actionTypes";
import { notification } from "antd";

const env = process.env.NODE_ENV || "development";
const serverUrl =
  env === "development"
    ? "http://127.0.0.1:8000"
    : "https://trip-companion-server.herokuapp.com";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 100000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${serverUrl}/rest-auth/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        axios
          .get(`${serverUrl}/administration/users/?username=${username}`)
          .then((response) => {
            localStorage.setItem("userId", response.data[0].id);
            const token = res.data.key;
            const usrname = username;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem("token", token);
            localStorage.setItem("username", usrname);
            localStorage.setItem("expirationDate", expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
            window.location.replace("/trips/");
          });
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${serverUrl}/rest-auth/registration/`, {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        axios
          .get(`${serverUrl}/administration/users/?username=${username}`)
          .then((res) => {
            localStorage.setItem("userId", res.data[0].id);
          });
        const token = res.data.key;
        const usrname = username;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("username", usrname);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
        setTimeout(function () {
          window.location.replace("/");
        }, 1000);
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authChangePassword = (newpassword, confirm, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(
        `${serverUrl}/rest-auth/password/change/`,
        {
          new_password1: newpassword,
          new_password2: confirm,
          old_password: password,
        },
        {
          headers: { Authorization: "Token " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        notification.open({
          message: "Saved City Tour",
          description: "Password has been changed successfully",
        });
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(checkAuthTimeout(3600));
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

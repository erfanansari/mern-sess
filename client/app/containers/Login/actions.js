/*
 *
 * Login actions
 *
 */

import { success } from "react-notification-system-redux";
import axios from "axios";
import { push } from "connected-react-router";

import {
  LOGIN_CHANGE,
  LOGIN_RESET,
  SET_LOGIN_LOADING,
  SET_LOGIN_FORM_ERRORS,
  SET_LOGIN_SUBMITTING,
} from "./constants";
import { setAuth, clearAuth } from "../Authentication/actions";
import setToken from "../../utils/token";
import handleError from "../../utils/error";
import { clearCart } from "../Cart/actions";
import { clearAccount } from "../Account/actions";
import { allFieldsValidation } from "../../utils/validation";
import { API_URL } from "../../constants";

export const loginChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: LOGIN_CHANGE,
    payload: formData,
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    const rules = {
      email: "required|email",
      password: "required|min:6",
    };

    const user = getState().login.loginFormData;

    const { isValid, errors } = allFieldsValidation(user, rules, {
      "required.email": "ایمیل لازم است",
      "email.email": "فرمت ایمیل نامعتبر است",
      "required.password": "رمز عبور لازم است",
      "min.password": "رمز عبور باید حداقل 6 کاراکتر باشد",
    });

    if (!isValid) {
      return dispatch({ type: SET_LOGIN_FORM_ERRORS, payload: errors });
    }

    dispatch({ type: SET_LOGIN_SUBMITTING, payload: true });
    dispatch({ type: SET_LOGIN_LOADING, payload: true });

    try {
      const response = await axios.post(`${API_URL}/auth/login`, user);

      const firstName = response.data.user.firstName;

      const successfulOptions = {
        title: `!سلام${firstName ? ` ${firstName}` : ""}, خوش آمدید`,
        position: "tr",
        autoDismiss: 1,
      };

      localStorage.setItem("token", response.data.token);

      setToken(response.data.token);

      dispatch(setAuth());
      dispatch(success(successfulOptions));

      dispatch({ type: LOGIN_RESET });
    } catch (error) {
      const title = `!خطا در ورود به سیستم`;
      handleError(error, dispatch, title);
    } finally {
      dispatch({ type: SET_LOGIN_SUBMITTING, payload: false });
      dispatch({ type: SET_LOGIN_LOADING, payload: false });
    }
  };
};

export const signOut = () => {
  return (dispatch, getState) => {
    const successfulOptions = {
      title: `خارج شدی`,
      position: "tr",
      autoDismiss: 1,
    };

    dispatch(clearAuth());
    dispatch(clearAccount());
    dispatch(push("/login"));

    localStorage.removeItem("token");

    dispatch(success(successfulOptions));
    // dispatch(clearCart());
  };
};

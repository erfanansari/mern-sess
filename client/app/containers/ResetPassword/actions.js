/*
 *
 * ResetPassword actions
 *
 */

import { push } from "connected-react-router";
import { success } from "react-notification-system-redux";
import axios from "axios";

import {
  RESET_PASSWORD_CHANGE,
  RESET_PASSWORD_RESET,
  SET_RESET_PASSWORD_FORM_ERRORS,
} from "./constants";

import { signOut } from "../Login/actions";
import handleError from "../../utils/error";
import { allFieldsValidation } from "../../utils/validation";
import { API_URL } from "../../constants";

export const resetPasswordChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: RESET_PASSWORD_CHANGE,
    payload: formData,
  };
};

export const resetPassword = (token) => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        password: "required|min:6",
        confirmPassword: "required|min:6|same:password",
      };
      const user = getState().resetPassword.resetFormData;

      const { isValid, errors } = allFieldsValidation(user, rules, {
        "required.password": "رمز عبور الزامی است.",
        "min.password": "رمز عبور باید حداقل 6 کاراکتر باشد.",
        "required.confirmPassword": "تکرار رمز عبور الزامی است.",
        "min.confirmPassword": "تکرار رمز عبور باید حداقل 6 کاراکتر باشد.",
        "same.confirmPassword": "رمز عبور و تکرار آن باید یکسان باشند.",
      });

      if (!isValid) {
        return dispatch({
          type: SET_RESET_PASSWORD_FORM_ERRORS,
          payload: errors,
        });
      }

      const response = await axios.post(`${API_URL}/auth/reset/${token}`, user);
      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };

      if (response.data.success == true) {
        dispatch(push("/login"));
      }

      dispatch(success(successfulOptions));
      dispatch({ type: RESET_PASSWORD_RESET });
    } catch (error) {
      const title = "لطفا بعدا تلاش کنید";
      handleError(error, dispatch, title);
    }
  };
};

export const resetAccountPassword = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        password: "required|min:6",
        confirmPassword: "required|min:6",
      };

      const user = getState().resetPassword.resetFormData;

      const { isValid, errors } = allFieldsValidation(user, rules, {
        "required.password": "Password is required.",
        "min.password": "Password must be at least 6 characters.",
        "required.confirmPassword": "Confirm password is required.",
        "min.confirmPassword":
          "Confirm password must be at least 6 characters.",
      });

      if (!isValid) {
        return dispatch({
          type: SET_RESET_PASSWORD_FORM_ERRORS,
          payload: errors,
        });
      }

      const response = await axios.post(`${API_URL}/auth/reset`, user);
      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };

      if (response.data.success === true) {
        dispatch(signOut());
      }

      dispatch(success(successfulOptions));
      dispatch({ type: RESET_PASSWORD_RESET });
    } catch (error) {
      const title = "لطفا بعدا تلاش کنید";
      handleError(error, dispatch, title);
    }
  };
};

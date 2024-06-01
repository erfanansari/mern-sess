/*
 *
 * Contact actions
 *
 */

import { success } from "react-notification-system-redux";
import axios from "axios";

import {
  CONTACT_FORM_CHANGE,
  SET_CONTACT_FORM_ERRORS,
  CONTACT_FORM_RESET,
} from "./constants";
import handleError from "../../utils/error";
import { allFieldsValidation } from "../../utils/validation";
import { API_URL } from "../../constants";

export const contactFormChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: CONTACT_FORM_CHANGE,
    payload: formData,
  };
};

export const contactUs = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: "required",
        email: "required|email",
        message: "required|min:10",
      };

      const contact = getState().contact.contactFormData;

      const { isValid, errors } = allFieldsValidation(contact, rules, {
        "required.name": "نام لازم است ",
        "required.email": "ایمیل لازم است",
        "email.email": "فرمت ایمیل نامعتبر است",
        "required.message": "پیام لازم است",
        "min.message": "پیام باید حداقل 10 کاراکتر باشد",
      });

      if (!isValid) {
        return dispatch({ type: SET_CONTACT_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`${API_URL}/contact/add`, contact);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };

      dispatch({ type: CONTACT_FORM_RESET });
      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

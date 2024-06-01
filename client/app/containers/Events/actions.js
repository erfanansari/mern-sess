/*
 *
 * EVENTS actions
 *
 */

import axios from "axios";

import {
  FETCH_EVENTS,
  FETCH_SEARCHED_EVENTS,
  SET_ADVANCED_FILTERS,
  SET_EVENTS_LOADING,
} from "./constants";

import handleError from "../../utils/error";
import { API_URL } from "../../constants";

export const setEventLoading = (value) => {
  return {
    type: SET_EVENTS_LOADING,
    payload: value,
  };
};

export const fetchEVENTS = (page) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setEventLoading(true));
      const response = await axios.get(`${API_URL}/event`, {
        params: {
          page: page ?? 1,
          limit: 20,
        },
      });

      const { EVENTS, totalPages, currentPage, count } = response.data;

      dispatch({
        type: FETCH_EVENTS,
        payload: EVENTS,
      });
      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: { totalPages, currentPage, count },
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setEventLoading(false));
    }
  };
};

export const searchEvents = (filter) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setEventLoading(true));

      const response = await axios.get(`${API_URL}/event/search`, {
        params: {
          search: filter.value,
        },
      });

      dispatch({ type: FETCH_SEARCHED_EVENTS, payload: response.data.events });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setEventLoading(false));
    }
  };
};

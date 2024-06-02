/*
 *
 * Users actions
 *
 */

import axios from "axios";

import {
  FETCH_JOBS,
  FETCH_SEARCHED_JOBS,
  SET_ADVANCED_FILTERS,
  SET_JOBS_LOADING,
} from "./constants";

import handleError from "../../utils/error";
import { API_URL } from "../../constants";

export const setJobLoading = (value) => {
  return {
    type: SET_JOBS_LOADING,
    payload: value,
  };
};

export const fetchJobs = (page) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setJobLoading(true));
      const response = await axios.get(`${API_URL}/job`, {
        params: {
          page: page ?? 1,
          limit: 20,
        },
      });
      console.log("response", response);

      const { jobs, totalPages, currentPage, count } = response.data;

      dispatch({
        type: FETCH_JOBS,
        payload: jobs,
      });
      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: { totalPages, currentPage, count },
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setJobLoading(false));
    }
  };
};

export const searchJobs = (filter) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setJobLoading(true));

      const response = await axios.get(`${API_URL}/job/search`, {
        params: {
          search: filter.value,
        },
      });

      dispatch({ type: FETCH_SEARCHED_JOBS, payload: response.data.jobs });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setJobLoading(false));
    }
  };
};

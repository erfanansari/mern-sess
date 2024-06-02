/*
 *
 * Jobs reducer
 *
 */

import {
  FETCH_JOBS,
  FETCH_SEARCHED_JOBS,
  SET_ADVANCED_FILTERS,
  SET_JOBS_LOADING,
} from "./constants";

const initialState = {
  jobs: [],
  searchedJobs: [],
  advancedFilters: {
    totalPages: 1,
    currentPage: 1,
    count: 0,
  },
  isLoading: false,
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };
    case FETCH_SEARCHED_JOBS:
      return {
        ...state,
        searchedJobs: action.payload,
      };
    case SET_ADVANCED_FILTERS:
      return {
        ...state,
        advancedFilters: {
          ...state.advancedFilters,
          ...action.payload,
        },
      };
    case SET_JOBS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default jobsReducer;

/*
 *
 * Events reducer
 *
 */

import {
  FETCH_EVENTS,
  FETCH_SEARCHED_EVENTS,
  SET_ADVANCED_FILTERS,
  SET_EVENTS_LOADING,
} from "./constants";

const initialState = {
  events: [],
  searchedEvents: [],
  advancedFilters: {
    totalPages: 1,
    currentPage: 1,
    count: 0,
  },
  isLoading: false,
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case FETCH_SEARCHED_EVENTS:
      return {
        ...state,
        searchedEvents: action.payload,
      };
    case SET_ADVANCED_FILTERS:
      return {
        ...state,
        advancedFilters: {
          ...state.advancedFilters,
          ...action.payload,
        },
      };
    case SET_EVENTS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default eventsReducer;

import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { combineReducers } from "redux";
import { REQUEST_DATA, REQUEST_CHANGE, FINISH_REQUEST, DENY_ACCESS } from "../actions/requests";
import { RECEIVE_TRIPS, ADD_TRIP, REMOVE_TRIP, EDIT_TRIP } from "../actions/trips";
import { RECEIVE_CITY_TOURS, ADD_CITY_TOUR, REMOVE_CITY_TOUR, EDIT_CITY_TOUR } from "../actions/cityTours";
import { RECEIVE_PLACES, ADD_PLACE, REMOVE_PLACE, EDIT_PLACE } from "../actions/places";

const initialState = {
  token: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    username: action.username,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
  });
};

function authReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

function requestsReducer(state = { isLocked: false, isLoading: false, hasAccess: true }, action) {
  switch (action.type) {
    case REQUEST_DATA:
      return { ...state, isLoading: action.level };
    case REQUEST_CHANGE:
      return { ...state, isLocked: true };
    case FINISH_REQUEST:
      return { ...state, isLocked: false, isLoading: false };
    case DENY_ACCESS:
      return { ...state, hasAccess: false };
    default:
      return state;
  }
}

function tripsReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_TRIPS:
      return action.trips;
    case ADD_TRIP:
      return [...state, action.trip];
    case EDIT_TRIP:
      return state.map((trip) => (trip.id === action.trip.id ? action.trip : trip));
    case REMOVE_TRIP:
      return state.filter((trip) => trip.id !== action.trip);
    default:
      return state;
  }
}

function cityToursReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_CITY_TOURS:
      return action.cityTours;
    case ADD_CITY_TOUR:
      return [...state, action.cityTour];
    case EDIT_CITY_TOUR:
      return state.map((cityTour) => (cityTour.id === action.cityTour.id ? action.cityTour : cityTour));
    case REMOVE_CITY_TOUR:
      return state.filter((cityTour) => cityTour.id !== action.cityTour);
    default:
      return state;
  }
}

function placesReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_PLACES:
      return action.places;
    case ADD_PLACE:
      return [...state, action.place];
    case EDIT_PLACE:
      return state.map((place) => (place.id === action.place.id ? action.place : place));
    case REMOVE_PLACE:
      return state.filter((place) => place.id !== action.place);
    default:
      return state;
  }
}

const reducer = combineReducers({
  auth: authReducer,
  request: requestsReducer,
  trips: tripsReducer,
  cityTours: cityToursReducer,
  places: placesReducer,
});

export default reducer;


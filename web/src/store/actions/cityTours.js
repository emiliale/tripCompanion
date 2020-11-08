import axios from "axios";
import { requestData, requestChange, finishRequest } from "./requests";

export const RECEIVE_CITY_TOURS = "RECEIVE_CITY_TOURS";
export const ADD_CITY_TOUR = "ADD_CITY_TOUR";
export const EDIT_CITY_TOUR = "EDIT_CITY_TOUR";
export const REMOVE_CITY_TOUR = "REMOVE_CITY_TOUR";

const env = process.env.NODE_ENV || "development";
const serverUrl =
  env === "development"
    ? "http://127.0.0.1:8000"
    : "https://trip-companion-server.herokuapp.com";

export function receiveCityTours(data) {
  return {
    type: RECEIVE_CITY_TOURS,
    cityTours: data,
  };
}

function addCityTour(data) {
  return {
    type: ADD_CITY_TOUR,
    cityTour: data,
  };
}

function editCityTour(data) {
  return {
    type: EDIT_CITY_TOUR,
    cityTour: data,
  };
}

function removeCityTour(id) {
  return {
    type: REMOVE_CITY_TOUR,
    cityTourId: id,
  };
}

export function getCityTours(level) {
  return (dispatch) => {
    dispatch(requestData(level));
    axios.get(`${serverUrl}/cityTour/cityTours/`).then((res) => {
      console.log(res);
      if (res.status !== "error") dispatch(receiveCityTours(res.data));
      dispatch(finishRequest());
    });
  };
}

export function newCityTour(name, city, distance, date, trip, users, places) {
  return (dispatch) => {
    axios
      .post(`${serverUrl}/cityTour/cityTours/`, {
        name: name,
        city: city,
        distance: distance,
        date: date,
        trip: trip,
        users: users,
        places: places,
      })
      .then((res) => {
        dispatch(addCityTour(res.data));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function updateCityTour(
  cityTourId,
  name,
  city,
  distance,
  date,
  trip,
  users,
  places
) {
  return (dispatch) => {
    axios
      .put(`${serverUrl}/cityTour/cityTours/` + cityTourId + "/", {
        name: name,
        city: city,
        distance: distance,
        date: date,
        trip: trip,
        users: users,
        places: places,
      })
      .then((res) => {
        dispatch(editCityTour(res.data));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteCityTour(cityTourId) {
  return (dispatch) => {
    axios
      .delete(`${serverUrl}/cityTour/cityTours/` + cityTourId + "/")
      .then((res) => {
        dispatch(removeCityTour(cityTourId));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

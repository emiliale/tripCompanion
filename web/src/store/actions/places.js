import axios from "axios";
import { requestData, requestChange, finishRequest } from "./requests";

export const RECEIVE_PLACES = "RECEIVE_PLACES";
export const ADD_PLACE = "ADD_PLACE";
export const EDIT_PLACE = "EDIT_PLACE";
export const REMOVE_PLACE = "REMOVE_PLACE";

const env = process.env.NODE_ENV || "development";
const serverUrl =
  env === "development"
    ? "http://127.0.0.1:8000"
    : "https://trip-companion-server.herokuapp.com";

export function receivePlaces(data) {
  return {
    type: RECEIVE_PLACES,
    places: data,
  };
}

export function addPlace(data) {
  return {
    type: ADD_PLACE,
    place: data,
  };
}

function editPlace(data) {
  return {
    type: EDIT_PLACE,
    place: data,
  };
}

function removePlace(id) {
  return {
    type: REMOVE_PLACE,
    placeId: id,
  };
}

export function getPlaces(level) {
  return (dispatch) => {
    dispatch(requestData(level));
    axios.get(`${serverUrl}/place/places/`).then((res) => {
      if (res.status !== "error") dispatch(receivePlaces(res.data));
      dispatch(finishRequest());
    });
  };
}

export function newPlace(xid, name, lng, lat, duration, distance) {
  return (dispatch) => {
    axios
      .post(`${serverUrl}/place/places/`, {
        xid: xid,
        name: name,
        lng: lng,
        lat: lat,
        duration: duration,
        distance: distance,
      })
      .then((res) => {
        dispatch(addPlace(res.data));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function updatePlace(placeId, xid, name, lng, lat, duration, distance) {
  return (dispatch) => {
    axios
      .put(`${serverUrl}/place/places/` + placeId + "/", {
        xid: xid,
        name: name,
        lng: lng,
        lat: lat,
        duration: duration,
        distance: distance,
      })
      .then((res) => {
        dispatch(editPlace(res.data));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deletePlace(placeId) {
  return (dispatch) => {
    axios
      .delete(`${serverUrl}/place/places/` + placeId + "/")
      .then((res) => {
        dispatch(removePlace(res.data));
        dispatch(finishRequest());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

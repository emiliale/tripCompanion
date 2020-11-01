import axios from "axios";
import { requestData, requestChange, finishRequest } from "./requests";

export const RECEIVE_TRIPS = "RECEIVE_TRIPS";
export const ADD_TRIP = "ADD_TRIP";
export const EDIT_TRIP = "EDIT_TRIP";
export const REMOVE_TRIP = "REMOVE_TRIP";

const env = process.env.NODE_ENV || "development";
const serverUrl = env === "development" ? "http://127.0.0.1:8000" : "https://trip-companion-server.herokuapp.com";

export function receiveTrips(data) {
    return {
        type: RECEIVE_TRIPS,
        trips: data,
    };
}

function addTrip(data) {
    return {
        type: ADD_TRIP,
        trip: data,
    };
}

function editTrip(data) {
    return {
        type: EDIT_TRIP,
        trip: data,
    };
}

function removeTrip(id) {
    return {
        type: REMOVE_TRIP,
        tripId: id,
    };
}

export function getTrips(level) {
    return (dispatch) => {
        dispatch(requestData(level));
        axios.get(`${serverUrl}/trip/trips/`).then(res => {
            console.log(res)
            if (res.status !== "error") dispatch(receiveTrips(res.data));
            dispatch(finishRequest());
        });
    };
}

export function newTrip(name, location, start_date, end_date, users) {
    return (dispatch) => {
        axios
            .post(`${serverUrl}/trip/trips/`, {
                name: name,
                location: location,
                start_date: start_date,
                end_date: end_date,
                users: users,
            })
            .then((res) => {
                dispatch(addTrip(res.data));
                dispatch(finishRequest());
            })
            .catch((err) => {
                console.log(err)
            });
    };
}

export function updateTrip(tripId, name, location, start_date, end_date, users) {
    return (dispatch) => {
        axios
            .put(`${serverUrl}/trip/trips/` + tripId + "/", {
                name: name,
                location: location,
                start_date: start_date,
                end_date: end_date,
                users: users,
            })
            .then((res) => {
                dispatch(editTrip(res.data));
                dispatch(finishRequest());
            })
            .catch((err) => {
                console.log(err)
            });
    };
}

export function deleteTrip(tripId) {
    return (dispatch) => {
        axios
            .delete(`${serverUrl}/trip/trips/` + tripId + "/")
            .then((res) => {
                dispatch(removeTrip(res.data));
                dispatch(finishRequest());
            })
            .catch((err) => {
                console.log(err)
            });
    };
}

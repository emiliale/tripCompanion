import axios from "axios";
import { requestData, requestChange, finishRequest } from "./requests";

export const RECEIVE_USERS = "RECEIVE_USERS";

const env = process.env.NODE_ENV || "development";
const serverUrl =
  env === "development"
    ? "http://127.0.0.1:8000"
    : "https://trip-companion-server.herokuapp.com";

export function receiveUsers(data) {
  return {
    type: RECEIVE_USERS,
    users: data,
  };
}

export function getUsers(level) {
  return (dispatch) => {
    dispatch(requestData(level));
    axios.get(`${serverUrl}/administration/users/`).then((res) => {
      if (res.status !== "error") dispatch(receiveUsers(res.data));
      dispatch(finishRequest());
    });
  };
}

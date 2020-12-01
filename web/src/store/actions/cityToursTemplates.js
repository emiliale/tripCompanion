import axios from "axios";
import { requestData, requestChange, finishRequest } from "./requests";
import i18n from "../../i18n";
import { notification } from "antd";
export const RECEIVE_CITY_TOUR_TEMPLATES = "RECEIVE_CITY_TOUR_TEMPLATES";
export const CREATE_CITY_TOUR_FROM_TEMPLATE = "CREATE_CITY_TOUR_FROM_TEMPLATE";

const env = process.env.NODE_ENV || "development";
const serverUrl =
  env === "development"
    ? "http://127.0.0.1:8000"
    : "https://trip-companion-server.herokuapp.com";

export function receiveCityTourTemplates(data) {
  return {
    type: RECEIVE_CITY_TOUR_TEMPLATES,
    cityTourTemplates: data,
  };
}

function addCityTour(data) {
  return {
    type: CREATE_CITY_TOUR_FROM_TEMPLATE,
    cityTour: data,
  };
}

export function getCityTourTemplates(level) {
  return (dispatch) => {
    dispatch(requestData(level));
    axios.get(`${serverUrl}/cityTour/cityToursTemplates/`).then((res) => {
      if (res.status !== "error") dispatch(receiveCityTourTemplates(res.data));
      dispatch(finishRequest());
    });
  };
}

export function createCityTourFromTemplate(name, date, trip, users, template) {
  return (dispatch) => {
    axios
      .post(`${serverUrl}/cityTour/create_cityTour_from_template/`, {
        name: name,
        date: date,
        trip: trip,
        users: users,
        template: template,
      })
      .then((res) => {
        dispatch(addCityTour(res.data));
        dispatch(finishRequest());
        notification.open({
          message: i18n.t("tour.savedTour"),
          description: i18n.t("tour.tourSuccess"),
        });
        setTimeout(function () {
          window.location.replace("/trips");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

import React from "react";
import { Route } from "react-router-dom";

import Login from "./pages/User/Login";
import Main from "./pages/Main/Main";
import Signup from "./pages/User/Signup";
import ChangePassword from "./pages/User/ChangePassword";
import Functions from "./pages/Functions/Functions";
import Trips from "./pages/Trips/Trips";
import CityTours from "./pages/CityTours/CityTours";
import NewCityTour from "./pages/CityTours/NewCityTour";
import CityTour from "./pages/CityTours/CityTour";
import Trip from "./pages/Trips/Trip";
import Statistics from "./pages/Statistics/Statistics";
import CityTourTemplate from "./pages/CityTours/CityTourTemplate"

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Main} />{" "}
    <Route exact path="/login/" component={Login} />{" "}
    <Route exact path="/signup/" component={Signup} />{" "}
    <Route exact path="/change_password/" component={ChangePassword} />{" "}
    <Route exact path="/functions/" component={Functions} />{" "}
    <Route exact path="/trips/" component={Trips} />{" "}
    <Route exact path="/trips/:id/" component={Trip} />{" "}
    <Route exact path="/city_tours/" component={CityTours} />{" "}
    <Route exact path="/city_tours/:id/" component={CityTour} />{" "}
    <Route exact path="/city_tours/template/:id" component={CityTourTemplate} />{" "}
    <Route exact path="/city_tours_new/" component={NewCityTour} />{" "}
    <Route exact path="/statistics/" component={Statistics} />{" "}
  </div>
);

export default BaseRouter;

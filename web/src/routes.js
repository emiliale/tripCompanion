import React from "react";
import { Route } from "react-router-dom";

import Login from "./pages/User/Login";
import Main from "./pages/Main/Main";
import Signup from "./pages/User/Signup";
import ChangePassword from "./pages/User/ChangePassword";
import Functions from "./pages/Functions/Functions";
import Trips from "./pages/Trips/Trips";
import Map from "./pages/Map/Map";
import CityTours from "./pages/CityTours/CityTours";
import NewCityTour from "./pages/CityTours/NewCityTour";
import Trip from "./pages/Trips/Trip";
import NewTrip from "./pages/Trips/NewTrip";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Main} />{" "}
    <Route exact path="/login/" component={Login} />{" "}
    <Route exact path="/signup/" component={Signup} />{" "}
    <Route exact path="/change_password/" component={ChangePassword} />{" "}
    <Route exact path="/functions/" component={Functions} />{" "}
    <Route exact path="/trips/" component={Trips} />{" "}
    <Route exact path="/trips_new/" component={NewTrip} />{" "}
    <Route exact path="/trips/:id/" component={Trip} />{" "}
    <Route exact path="/map/" component={Map} />{" "}
    <Route exact path="/city_tours/" component={CityTours} />{" "}
    <Route exact path="/city_tours_new/" component={NewCityTour} />{" "}
  </div>
);

export default BaseRouter;

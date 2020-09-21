import React from "react";
import { Route } from "react-router-dom";

import Login from "./pages/Login";
import Main from "./pages/Main";


const BaseRouter = () => (
  <div>
    <Route exact path="/login/" component={Login} />{" "}
    <Route exact path="/main/" component={Main} />{" "}
  </div>
);

export default BaseRouter;

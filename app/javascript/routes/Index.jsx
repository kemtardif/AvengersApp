import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Avengers from "../components/Avengers";
import Avenger from "../components/Avenger";
import NewAvenger from "../components/NewAvenger";
import EditAvenger from "../components/EditAvenger";


export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/avengers" exact component={Avengers} />
      <Route path="/avengers/:id" exact component={Avenger} />
      <Route path="/avengers/:id/edit" exact component={EditAvenger} />
      <Route path="/avenger" exact component={NewAvenger} />
    </Switch>
  </Router>
);
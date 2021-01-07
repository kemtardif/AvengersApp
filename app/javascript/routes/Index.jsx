import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import Avengers from "../components/Avengers";
import Avenger from "../components/Avenger";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" exact component={Recipes} />
      <Route path="/avengers" exact component={Avengers} />
      <Route path="/avenger/:name" exact component={Avenger} />
      <Route path="/recipe/:id" exact component={Recipe} />
    </Switch>
  </Router>
);
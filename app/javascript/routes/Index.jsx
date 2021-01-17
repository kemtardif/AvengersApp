import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../components/Home";
import Avengers from "../components/Avengers";
import Avenger from "../components/Avenger";
import NewAvenger from "../components/NewAvenger";
import EditAvenger from "../components/EditAvenger";
import PrivateRoute from "../components/ProtectedRoute";
import Flash from '../components/Flash';
import Bus from '../Utils/Bus';


window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));


export default (


  <Router>
    <Flash />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/avengers" exact component={Avengers} />
      <Route path="/avengers/:id" exact component={Avenger} />
      <PrivateRoute path='/avengers/:id/edit' exact component= {EditAvenger}  />
      <PrivateRoute path='/avenger'  exact component = {NewAvenger}/>
    </Switch>
  </Router>
);

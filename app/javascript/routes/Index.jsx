import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Dashboard from "../components/Dashboard";
import Companies from "../components/Companies";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/categories/:cat_id" exact component={Companies}/>
        </Switch>
    </Router>
);
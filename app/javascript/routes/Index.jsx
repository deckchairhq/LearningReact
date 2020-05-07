import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Vulnerabilities from "../components/Vulnerabilities";
import Vulnerability from "../components/Vulnerability";
import NewVulnerability from "../components/NewVulnerability";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/vulnerabilities" exact component={Vulnerabilities}/>
            <Route path="/vulnerability/:id" exact component={Vulnerability}/>
            <Route path="/vulnerability" exact component={NewVulnerability}/>
        </Switch>
    </Router>
);

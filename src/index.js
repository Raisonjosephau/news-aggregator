import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";

import Index from "views/Index.jsx";
import NewsDetails from "views/NewsDetails"

ReactDOM.render( <BrowserRouter >
        <Switch >
        <Route path = "/" exact component={Index} />} />
        <Route exact path="/news" component={NewsDetails} />
            <Redirect to = "/" />
            </Switch> </BrowserRouter> ,
            document.getElementById("root")
        );
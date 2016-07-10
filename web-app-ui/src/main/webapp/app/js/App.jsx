import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import '../styles/main.scss';
import Landing from "./components/Landing.react.jsx";

render((
    <Router history={hashHistory}>
        <Route path="/" component={Landing}/>
    </Router>
), document.getElementById('content'));
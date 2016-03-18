import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Topbar from './components/topbar';
import Home from './components/home';
import Locations from './components/locations';
import About from './components/about';

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Topbar}>
      <IndexRoute component={Home} />
      <Route path="locations" component={Locations} />
      <Route path="about" component={About} />
    </Route>
  </Router>
), app);

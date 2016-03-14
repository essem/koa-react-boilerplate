import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import Locations from './components/Locations';

const App = props => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    {props.children}
  </div>
);
App.propTypes = {
  children: React.PropTypes.element,
};

const Dashboard = () => <Locations />;

const About = () => <div>about</div>;

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="about" component={About} />
    </Route>
  </Router>
), app);

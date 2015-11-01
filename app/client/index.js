import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router'
import Button from 'react-bootstrap/lib/Button';

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

class Dashboard extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <div>hello world</div>
  }
}

class About extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <div>about</div>
  }
}

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="about" component={About} />
    </Route>
  </Router>
), document.getElementById('app'));

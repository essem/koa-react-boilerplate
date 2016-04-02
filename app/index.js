import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Topbar from './components/topbar';
import Home from './components/home';
import Todos from './components/todos';
import About from './components/about';

const app = document.createElement('div');
document.body.appendChild(app);

const store = createStore(todoApp, undefined,
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Topbar}>
        <IndexRoute component={Home} />
        <Route path="todos" component={Todos} />
        <Route path="about" component={About} />
      </Route>
    </Router>
  </Provider>
), app);

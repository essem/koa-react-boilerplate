import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import todosReducer from './reducers';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Topbar from './components/topbar';
import Home from './components/home';
import Todos from './components/todos';
import About from './components/about';

const app = document.createElement('div');
document.body.appendChild(app);

const store = createStore(
  combineReducers({
    todos: todosReducer,
    routing: routerReducer,
  }),
  undefined,
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Topbar}>
        <IndexRoute component={Home} />
        <Route path="todos" component={Todos} />
        <Route path="about" component={About} />
      </Route>
    </Router>
  </Provider>
), app);

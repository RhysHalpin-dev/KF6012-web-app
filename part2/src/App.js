import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Schedule from './components/Schedule.js';
import Authors from './components/Authors.js';
import Admin from './components/Admin.js';
import Home from './components/Home.js'
import './App.css';

class NotFound404 extends React.Component {
  render() {
    return (
      <div>
        <p>Not Found 404</p>
      </div>
    )
  }
}

function App() {
  return (
    <Router basename="/KF6012/part2">
      <div className="App">
        <nav>
          <ul>
            <li>
              <NavLink activeClassName="selected" exact to="/">Home</NavLink>
            </li>
            <li>
              <NavLink activeClassName="selected" to="/schedule">Schedule</NavLink>
            </li>
            <li>
              <NavLink activeClassName="selected" to="/authors">Authors</NavLink>
            </li>
            <li>
              <NavLink activeClassName="selected" to="/admin">Admin</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>

          <Route path="/schedule">
            <Schedule />
          </Route>
          <Route path="/authors">
            <Authors />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound404 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
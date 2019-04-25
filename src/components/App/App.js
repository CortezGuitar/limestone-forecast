import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import ThreeDaysForecast from '../ThreeDaysForecast';
import HomePage from '../HomePage';

import withOwmService from '../hoc';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/five-days-forecast" component={ThreeDaysForecast} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default withOwmService(App);

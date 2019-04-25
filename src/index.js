import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import OwmService from './services';
import { OwmServiceProvider } from './services';
import store from './store/store';
import ErrorBoundry from './components/ErrorBoundry';

const owmService = new OwmService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <OwmServiceProvider value={owmService}>
        <Router>
          <App />
        </Router>
      </OwmServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);

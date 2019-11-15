/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License.                                            *
 ******************************************************************************/

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter, push } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { sleep } from 'utils/async';
import { isDevelopment } from 'utils/env';
import configureStore from 'utils/store';
import getConfig from 'utils/getConfig';
import { setAppConfig, initApp } from 'App/actions';
import { setAuthEnabled, setAuthDisabled } from 'Auth/actions';
import App from 'App/index.js';
import Auth from 'Auth/index.js';
import PasswordChange from 'Auth/PasswordChange';
import TOTP from 'Auth/TOTP';
import 'icons/index';
import 'assets/normalize.css';
import 'index.css';

// setup browser history for client side routing
const history = createBrowserHistory({
  basename: '/',
});

// Please note this is a local url, handled by the app ( see Route below ). It is not the /api/login endpoint
const loginUrl = `${window.location.protocol}//${window.location.host}/login`;

const NotFound = () => <div> View Not Found </div>;

const Root = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/login" exact component={Auth} />
        <Route path="/login/2fa" component={TOTP} />
        <Route path="/login/passwordChange" component={PasswordChange} />
        <Route path="/" component={App} />
        <Route component={NotFound} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Root;

const boot = async () => {
  const { isAuthEnabled, apiBaseUrl } = await getConfig();
  const apiUrl = `${apiBaseUrl}/api`;

  const store = configureStore(history, { isDevelopment, isAuthEnabled });

  store.dispatch(setAppConfig({ apiUrl, loginUrl }));

  ReactDOM.render(<Root store={store} />, document.getElementById('root'));

  if (isDevelopment) {
    const fetch = window.fetch;
    window.fetch = async (...args) => {
      await sleep(200);
      return fetch(...args);
    };
    // assing to global so that we can easily retrieve state
    // and dispatch actions from the browser console
    global.dispatch = store.dispatch;
    global.getState = store.getState;

    // Allow to disable auth when developing
    global.auth = async (enable = false) => {
      if (enable) {
        store.dispatch(setAuthEnabled());
      } else {
        store.dispatch(setAuthDisabled());
      }
      store.dispatch(push('/'));
      await store.dispatch(initApp());
    };
  }

  global.version = () => {
    // Prints the TSP version and Commit Hash
    console.info(`TSP v${process.env.REACT_APP_VERSION}`);
    console.info(`Commit # ${process.env.REACT_APP_COMMIT}`);
  };
};

boot();

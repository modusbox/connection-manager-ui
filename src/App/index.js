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

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Spinner } from 'components';
import { withAuth } from './hocs';
import Navbar from './Navbar';
import SuccessToast from './SuccessToast';
import ErrorModal from './ErrorModal';
import Selection from './Selection';
import DFSP from './DFSP';
import Hub from './Hub';
import './App.css';

import { initApp, hideErrorModal } from './actions';
import {
  getIsAppLoading,
  getIsAppLoadingFailed,
  getIsSuccessToastVisible,
  getIsErrorModalVisible,
  getErrorModalContent,
} from './selectors';

const AppLoader = () => <Spinner center size="m" />;
const AppError = () => <div id="app_error">There was an error while reading the environments</div>;

class App extends PureComponent {
  render() {
    const {
      username,
      isSuccessToastVisible,
      isErrorModalVisible,
      errorModalContent,
      onCloseErrorModal,
      onLogoutClick,
    } = this.props;
    return (
      <div id="app">
        <div id="app__navbar">
          <Navbar onLogoutClick={onLogoutClick} username={username} />
        </div>
        <div id="app__content">
          <Route path="/" exact component={Selection} />
          <Route path="/dfsp" component={DFSP} />
          <Route path="/hub" component={Hub} />
        </div>
        <SuccessToast isVisible={isSuccessToastVisible} />
        <ErrorModal isVisible={isErrorModalVisible} content={errorModalContent} onClose={onCloseErrorModal} />
      </div>
    );
  }
}

const stateProps = state => ({
  isAppLoading: getIsAppLoading(state),
  isAppLoadingFailed: getIsAppLoadingFailed(state),
  isSuccessToastVisible: getIsSuccessToastVisible(state),
  isErrorModalVisible: getIsErrorModalVisible(state),
  errorModalContent: getErrorModalContent(state),
});
const actionProps = dispatch => ({
  initApp: () => dispatch(initApp()),
  onCloseErrorModal: () => dispatch(hideErrorModal()),
});

class AppWrapper extends PureComponent {
  componentWillMount() {
    this.props.initApp();
  }
  render() {
    if (this.props.isAppLoading) {
      return <AppLoader />;
    } else if (this.props.isAppLoadingFailed) {
      return <AppError />;
    }
    return <App {...this.props} />;
  }
}

const ConnectedApp = connect(
  stateProps,
  actionProps
)(AppWrapper);

export default withAuth(ConnectedApp);

export { App };

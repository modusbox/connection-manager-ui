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

import { handleActions } from 'redux-actions';
import { isDevelopment } from 'utils/env';
import {
  SET_APP_CONFIG,
  SET_APP_LOADING,
  UNSET_APP_LOADING,
  SHOW_TOAST,
  HIDE_TOAST,
  SHOW_ERROR_MODAL,
  HIDE_ERROR_MODAL,
  SET_ENVIRONMENTS,
  SET_ENVIRONMENTS_ERROR,
  SET_ENVIRONMENT_ID,
  SET_DFSPS,
  SET_DFSPS_ERROR,
  SET_DFSP_ID,
  UNSET_ENVIRONMENT_ID,
  UNSET_DFSPS,
} from './actions';

const initialState = {
  isDevelopment,
  config: {},
  isAppLoading: true,
  isSuccessToastVisible: false,
  isErrorModalVisible: false,
  errorModalPayload: undefined,
  environments: [],
  environmentsError: undefined,
  environmentsLoaded: false,
  environmentId: undefined,
  dfsps: [],
  dfspsError: undefined,
  dfspId: undefined,
};

const App = handleActions(
  {
    [SET_APP_CONFIG]: (state, action) => ({
      ...state,
      config: action.payload,
    }),
    [SET_APP_LOADING]: (state, action) => ({
      ...state,
      isAppLoading: true,
    }),
    [UNSET_APP_LOADING]: (state, action) => ({
      ...state,
      isAppLoading: false,
    }),
    [SHOW_TOAST]: (state, action) => ({
      ...state,
      isSuccessToastVisible: true,
    }),
    [HIDE_TOAST]: (state, action) => ({
      ...state,
      isSuccessToastVisible: false,
    }),
    [SHOW_ERROR_MODAL]: (state, action) => ({
      ...state,
      isErrorModalVisible: true,
      errorModalPayload: action.payload,
    }),
    [HIDE_ERROR_MODAL]: (state, action) => ({
      ...state,
      isErrorModalVisible: false,
      errorModalPayload: undefined,
    }),
    [SET_ENVIRONMENTS]: (state, action) => ({
      ...state,
      environments: action.payload,
      environmentsLoaded: true,
    }),
    [SET_ENVIRONMENTS_ERROR]: (state, action) => ({
      ...state,
      environmentsError: action.payload,
    }),
    [SET_ENVIRONMENT_ID]: (state, action) => ({
      ...state,
      environmentId: action.payload,
    }),
    [SET_DFSPS]: (state, action) => ({
      ...state,
      dfsps: action.payload,
    }),
    [SET_DFSPS_ERROR]: (state, action) => ({
      ...state,
      dfspsError: action.payload,
    }),
    [SET_DFSP_ID]: (state, action) => ({
      ...state,
      dfspId: action.payload,
    }),
    [UNSET_ENVIRONMENT_ID]: (state, action) => ({
      ...state,
      environmentId: undefined,
    }),
    [UNSET_DFSPS]: (state, action) => ({
      ...state,
      dfsps: initialState.dfsps,
    }),
  },
  initialState
);

export default App;
export { initialState };

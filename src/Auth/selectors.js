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

import { createSelector } from 'reselect';
import get from 'lodash/get';
import { getIsValid, toValidationResult } from 'modusbox-ui-components/dist/redux-validation';
import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';
import { getAuthValidation } from './validators';

export const getUsername = state => state.auth.login.username;
export const getPassword = state => state.auth.login.password;
export const getIsAuthDisabled = state => state.auth.login.isDisabled;
export const getIsAuthFailed = state => state.auth.login.isFailed;
export const getAuthError = state => state.auth.login.error;
export const getJwt = state => state.auth.login.jwt;
export const getQRProps = state => state.auth.login.QRProps;
export const getExpiration = state => state.auth.login.expiration;

export const getLoggedDfspId = createSelector(
  getJwt,
  jwt => get(jwt, 'dfspId')
);

export const getLoggedUsername = createSelector(
  getJwt,
  jwt => get(jwt, 'sub')
);

export const getIsHubUser = createSelector(
  getJwt,
  jwt => {
    const groups = get(jwt, 'groups');
    if (!groups) {
      return false;
    }
    return groups.includes('Application/PTA');
  }
);

const getAuthModel = createSelector(
  getUsername,
  getPassword,
  (username, password) => ({
    username,
    password,
  })
);
export const getValidationResult = createSelector(
  getAuthModel,
  getAuthValidation,
  toValidationResult
);

export const getIsAuthSubmitEnabled = createSelector(
  getValidationResult,
  getIsValid
);

export const getIsAuthPending = createPendingSelector('login.create');

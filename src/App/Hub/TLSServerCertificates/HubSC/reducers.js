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
import {
  RESET_HUB_SC,
  SET_HUB_SC_ERROR,
  SET_HUB_SC_ROOT_CERTIFICATE,
  SET_HUB_SC_INTERMEDIATE_CHAIN,
  SET_HUB_SC_SERVER_CERTIFICATE,
  SET_HUB_SC_ROOT_CERTIFICATE_INFO,
  SET_HUB_SC_INTERMEDIATE_CHAIN_INFO,
  SET_HUB_SC_SERVER_CERTIFICATE_INFO,
  SET_HUB_SC_VALIDATIONS,
  SET_HUB_SC_VALIDATION_STATE,
  CHANGE_HUB_SC_ROOT_CERTIFICATE,
  CHANGE_HUB_SC_INTERMEDIATE_CHAIN,
  CHANGE_HUB_SC_SERVER_CERTIFICATE,
  SHOW_HUB_SC_ROOT_CERTIFICATE_MODAL,
  HIDE_HUB_SC_ROOT_CERTIFICATE_MODAL,
  SHOW_HUB_SC_INTERMEDIATE_CHAIN_MODAL,
  HIDE_HUB_SC_INTERMEDIATE_CHAIN_MODAL,
  SHOW_HUB_SC_SERVER_CERTIFICATE_MODAL,
  HIDE_HUB_SC_SERVER_CERTIFICATE_MODAL,
} from './actions';

const initialState = {
  hubSCError: undefined,
  previousHubSCRootCertificate: undefined,
  previousHubSCIntermediateChain: undefined,
  previousHubSCServerCertificate: undefined,
  hubSCRootCertificate: undefined,
  hubSCIntermediateChain: undefined,
  hubSCServerCertificate: undefined,
  hubSCRootCertificateInfo: undefined,
  hubSCIntermediateChainInfo: undefined,
  hubSCServerCertificateInfo: undefined,
  hubSCValidations: [],
  hubSCValidationState: undefined,
  isHubSCRootCertificateModalVisible: false,
  isHubSCIntermediateChainModalVisible: false,
  isHubSCServerCertificateModalVisible: false,
};

const HubSC = handleActions(
  {
    [RESET_HUB_SC]: () => initialState,
    [SET_HUB_SC_ERROR]: (state, action) => ({
      ...state,
      hubSCError: action.payload,
    }),
    [SET_HUB_SC_ROOT_CERTIFICATE]: (state, action) => ({
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      ...state,
      previousHubSCRootCertificate: action.payload || null,
      hubSCRootCertificate: action.payload || null,
    }),
    [SET_HUB_SC_INTERMEDIATE_CHAIN]: (state, action) => ({
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      ...state,
      previousHubSCIntermediateChain: action.payload || null,
      hubSCIntermediateChain: action.payload || null,
    }),
    [SET_HUB_SC_SERVER_CERTIFICATE]: (state, action) => ({
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      ...state,
      previousHubSCServerCertificate: action.payload || null,
      hubSCServerCertificate: action.payload || null,
    }),
    [SET_HUB_SC_ROOT_CERTIFICATE_INFO]: (state, action) => ({
      ...state,
      hubSCRootCertificateInfo: action.payload,
    }),
    [SET_HUB_SC_INTERMEDIATE_CHAIN_INFO]: (state, action) => ({
      ...state,
      hubSCIntermediateChainInfo: action.payload,
    }),
    [SET_HUB_SC_SERVER_CERTIFICATE_INFO]: (state, action) => ({
      ...state,
      hubSCServerCertificateInfo: action.payload,
    }),

    [SET_HUB_SC_VALIDATIONS]: (state, action) => ({
      ...state,
      hubSCValidations: action.payload,
    }),
    [SET_HUB_SC_VALIDATION_STATE]: (state, action) => ({
      ...state,
      hubSCValidationState: action.payload,
    }),
    [CHANGE_HUB_SC_ROOT_CERTIFICATE]: (state, action) => ({
      ...state,
      hubSCRootCertificate: action.payload || null,
      hubSCRootCertificateInfo: initialState.hubSCRootCertificateInfo,
      hubSCValidationState: initialState.hubSCValidationState,
      hubSCValidations: initialState.hubSCValidations,
    }),
    [CHANGE_HUB_SC_INTERMEDIATE_CHAIN]: (state, action) => ({
      ...state,
      hubSCIntermediateChain: action.payload || null,
      hubSCIntermediateChainInfo: initialState.hubSCIntermediateChainInfo,
      hubSCValidationState: initialState.hubSCValidationState,
      hubSCValidations: initialState.hubSCValidations,
    }),
    [CHANGE_HUB_SC_SERVER_CERTIFICATE]: (state, action) => ({
      ...state,
      hubSCServerCertificate: action.payload || null,
      hubSCServerCertificateInfo: initialState.hubSCServerCertificateInfo,
      hubSCValidationState: initialState.hubSCValidationState,
      hubSCValidations: initialState.hubSCValidations,
    }),

    [SHOW_HUB_SC_ROOT_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isHubSCRootCertificateModalVisible: true,
    }),
    [HIDE_HUB_SC_ROOT_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isHubSCRootCertificateModalVisible: false,
    }),
    [SHOW_HUB_SC_INTERMEDIATE_CHAIN_MODAL]: (state, action) => ({
      ...state,
      isHubSCIntermediateChainModalVisible: true,
    }),
    [HIDE_HUB_SC_INTERMEDIATE_CHAIN_MODAL]: (state, action) => ({
      ...state,
      isHubSCIntermediateChainModalVisible: false,
    }),
    [SHOW_HUB_SC_SERVER_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isHubSCServerCertificateModalVisible: true,
    }),
    [HIDE_HUB_SC_SERVER_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isHubSCServerCertificateModalVisible: false,
    }),
  },
  initialState
);

export default HubSC;
export { initialState };

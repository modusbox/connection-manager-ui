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
  RESET_DFSP_CA,
  SET_DFSP_CA_ERROR,
  SET_DFSP_CA_ROOT_CERTIFICATE,
  SET_DFSP_CA_INTERMEDIATE_CHAIN,
  SET_DFSP_CA_VALIDATIONS,
  SET_DFSP_CA_VALIDATION_STATE,
  CHANGE_DFSP_CA_ROOT_CERTIFICATE,
  CHANGE_DFSP_CA_INTERMEDIATE_CHAIN,
  SHOW_DFSP_CA_ROOT_CERTIFICATE_MODAL,
  HIDE_DFSP_CA_ROOT_CERTIFICATE_MODAL,
  SHOW_DFSP_CA_INTERMEDIATE_CHAIN_MODAL,
  HIDE_DFSP_CA_INTERMEDIATE_CHAIN_MODAL,
} from './actions';

const initialState = {
  dfspCaError: undefined,
  dfspCaRootCert: undefined,
  dfspCaIntermediateChain: undefined,
  dfspCaValidations: [],
  dfspCaValidationState: undefined,
  isDfspCaRootCertificateModalVisible: false,
  isDfspCaIntermediateChainModalVisible: false,
};

const DfspCa = handleActions(
  {
    [RESET_DFSP_CA]: () => initialState,
    [SET_DFSP_CA_ERROR]: (state, action) => ({
      ...state,
      dfspCaError: action.payload,
    }),
    [SET_DFSP_CA_ROOT_CERTIFICATE]: (state, action) => ({
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      ...state,
      dfspCaRootCert: action.payload || null,
    }),
    [SET_DFSP_CA_INTERMEDIATE_CHAIN]: (state, action) => ({
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      ...state,
      dfspCaIntermediateChain: action.payload || null,
    }),
    [SET_DFSP_CA_VALIDATIONS]: (state, action) => ({
      ...state,
      dfspCaValidations: action.payload,
    }),
    [SET_DFSP_CA_VALIDATION_STATE]: (state, action) => ({
      ...state,
      dfspCaValidationState: action.payload,
    }),
    [CHANGE_DFSP_CA_ROOT_CERTIFICATE]: (state, action) => ({
      ...state,
      dfspCaRootCert: action.payload,
      dfspCaValidations: initialState.dfspCaValidations,
      dfspCaValidationState: initialState.dfspCaValidationState,
    }),
    [CHANGE_DFSP_CA_INTERMEDIATE_CHAIN]: (state, action) => ({
      ...state,
      dfspCaIntermediateChain: action.payload,
      dfspCaValidations: initialState.dfspCaValidations,
      dfspCaValidationState: initialState.dfspCaValidationState,
    }),
    [SHOW_DFSP_CA_ROOT_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isDfspCaRootCertificateModalVisible: true,
    }),
    [HIDE_DFSP_CA_ROOT_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isDfspCaRootCertificateModalVisible: false,
    }),
    [SHOW_DFSP_CA_INTERMEDIATE_CHAIN_MODAL]: (state, action) => ({
      ...state,
      isDfspCaIntermediateChainModalVisible: true,
    }),
    [HIDE_DFSP_CA_INTERMEDIATE_CHAIN_MODAL]: (state, action) => ({
      ...state,
      isDfspCaIntermediateChainModalVisible: false,
    }),
  },
  initialState
);

export default DfspCa;
export { initialState };

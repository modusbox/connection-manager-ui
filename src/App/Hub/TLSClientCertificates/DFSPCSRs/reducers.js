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
  RESET_HUB_DFSP_CSR,
  SET_HUB_DFSP_CSR_ERROR,
  SET_HUB_DFSP_CSR_FILTER,
  SET_HUB_DFSP_CSR_CERTIFICATES,
  SHOW_HUB_DFSP_CSR_CERTIFICATE_MODAL,
  HIDE_HUB_DFSP_CSR_CERTIFICATE_MODAL,
  SHOW_HUB_DFSP_CSR_CERTIFICATE_UPLOAD_MODAL,
  HIDE_HUB_DFSP_CSR_CERTIFICATE_UPLOAD_MODAL,
  SET_HUB_DFSP_CSR_CERTIFICATE_UPLOAD_MODAL_CERTIFICATE,
  SET_HUB_DFSP_CSR_CERTIFICATE_UPLOAD_MODAL_CA_ID,
} from './actions';

const initialState = {
  hubDfspCsrsError: undefined,
  hubDfspCsrsFilter: '',
  hubDfspCsrsCertificates: [],
  isHubDfspCsrsCertificateModalVisible: false,
  hubDfspCsrsCertificateModalContent: undefined,
  hubDfspCsrsCertificateModalTitle: undefined,
  hubDfspCsrsCertificateUploadModalCertificate: undefined,
  hubDfspCsrsCertificateUploadModalHubCaId: undefined,
  isHubDfspCsrsCertificateUploadModalVisible: false,
  hubDfspCsrsCertificateUploadModalDfspId: undefined,
  hubDfspCsrsCertificateUploadModalEnrollmentId: undefined,
};

const HubDfspCsrs = handleActions(
  {
    [RESET_HUB_DFSP_CSR]: () => initialState,
    [SET_HUB_DFSP_CSR_ERROR]: (state, action) => ({
      ...state,
      hubDfspCsrsError: action.payload,
    }),
    [SET_HUB_DFSP_CSR_FILTER]: (state, action) => ({
      ...state,
      hubDfspCsrsFilter: action.payload || '',
    }),
    [SET_HUB_DFSP_CSR_CERTIFICATES]: (state, action) => ({
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      ...state,
      hubDfspCsrsCertificates: action.payload || [],
    }),
    [SHOW_HUB_DFSP_CSR_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isHubDfspCsrsCertificateModalVisible: true,
      hubDfspCsrsCertificateModalContent: action.payload.certificate,
      hubDfspCsrsCertificateModalTitle: action.payload.title,
    }),
    [HIDE_HUB_DFSP_CSR_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isHubDfspCsrsCertificateModalVisible: false,
      hubDfspCsrsCertificateModalContent: undefined,
      hubDfspCsrsCertificateModalTitle: undefined,
    }),
    [SHOW_HUB_DFSP_CSR_CERTIFICATE_UPLOAD_MODAL]: (state, action) => ({
      ...state,
      hubDfspCsrsCertificateUploadModalDfspId: action.payload.dfspId,
      hubDfspCsrsCertificateUploadModalEnrollmentId: action.payload.enrollmentId,
      isHubDfspCsrsCertificateUploadModalVisible: true,
    }),
    [HIDE_HUB_DFSP_CSR_CERTIFICATE_UPLOAD_MODAL]: (state, action) => ({
      ...state,
      hubDfspCsrsCertificateUploadModalDfspId: undefined,
      hubDfspCsrsCertificateUploadModalEnrollmentId: undefined,
      isHubDfspCsrsCertificateUploadModalVisible: false,
      hubDfspCsrsCertificateUploadModalCertificate: undefined,
      hubDfspCsrsCertificateUploadModalHubCaId: undefined,
    }),
    [SET_HUB_DFSP_CSR_CERTIFICATE_UPLOAD_MODAL_CERTIFICATE]: (state, action) => ({
      ...state,
      hubDfspCsrsCertificateUploadModalCertificate: action.payload,
    }),
    [SET_HUB_DFSP_CSR_CERTIFICATE_UPLOAD_MODAL_CA_ID]: (state, action) => ({
      ...state,
      hubDfspCsrsCertificateUploadModalHubCaId: action.payload,
    }),
  },
  initialState
);

export default HubDfspCsrs;
export { initialState };

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

import { createAction } from 'redux-actions';
import find from 'lodash/find';
import api from 'utils/api';
import { is200 } from 'utils/http';
import { downloadFile } from 'utils/html';
import { getEnvironmentId } from 'App/selectors';
import { getOtherDfsps } from 'App/DFSP/selectors';

export const RESET_DFSPS_JWS = 'DFSPs JWS / Reset';
export const SET_DFSPS_JWS_ERROR = 'DFSPs JWS / Set JWS Cert Error';
export const SET_DFSPS_JWS_FILTER = 'DFSPs JWS / Set Filter';
export const SET_DFSPS_JWS_SAME_MONETARY_ZONE = 'DFSPs JWS / Set Same Monetary Zone';
export const SET_DFSPS_JWS_CERTIFICATES = 'DFSPs JWS / Set Certificates';
export const SHOW_DFSPS_JWS_JWS_CERTIFICATE_MODAL = 'DFSPs JWS / Show JWS Certificate Modal';
export const HIDE_DFSPS_JWS_JWS_CERTIFICATE_MODAL = 'DFSPs JWS / Hide JWS Certificate Modal';
export const SHOW_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL = 'DFSPs JWS / Show Intermediate Chain Modal';
export const HIDE_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL = 'DFSPs JWS / Hide Intermediate Chain Modal';
export const resetDfspsJWS = createAction(RESET_DFSPS_JWS);
export const setDfspsJWSError = createAction(SET_DFSPS_JWS_ERROR);
export const setDfspsJWSFilter = createAction(SET_DFSPS_JWS_FILTER);
export const setDfspsJWSSameMonetaryZone = createAction(SET_DFSPS_JWS_SAME_MONETARY_ZONE);
export const setDfspsJWSCertificates = createAction(SET_DFSPS_JWS_CERTIFICATES);
export const showDfspsJWSJwsCertificateModal = createAction(SHOW_DFSPS_JWS_JWS_CERTIFICATE_MODAL);
export const hideDfspsJWSJwsCertificateModal = createAction(HIDE_DFSPS_JWS_JWS_CERTIFICATE_MODAL);
export const showDfspsJWSIntermediateChainModal = createAction(SHOW_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL);
export const hideDfspsJWSIntermediateChainModal = createAction(HIDE_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL);

export const storeDfspsJWSCertificates = () => async (dispatch, getState) => {
  const environmentId = getEnvironmentId(getState());
  const otherDfsps = getOtherDfsps(getState());
  const { data, status } = await dispatch(api.dfspsJWSCerts.read({ environmentId }));
  if (is200(status)) {
    const certificates = data.filter(certificate => find(otherDfsps, { id: certificate.dfspId }));
    dispatch(setDfspsJWSCertificates(certificates));
  } else {
    dispatch(setDfspsJWSError('Generic'));
  }
};

export const downloadDfspsJWSJwsCertificate = ({ cert, dfspName }) => (dispatch, getState) => {
  downloadFile(cert, `${dfspName}-root.pem`);
};

export const downloadDfspsJWSIntermediateChain = ({ cert, dfspName }) => (dispatch, getState) => {
  downloadFile(cert, `${dfspName}-intermediates.pem`);
};

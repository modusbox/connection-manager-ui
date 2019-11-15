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

import { fetchMock, MATCHED } from 'fetch-mock';
import prepareStore, { getStore } from 'tests/store';
import environments from 'tests/resources/environments.json';
import dfsps from 'tests/resources/dfsps.json';

import {
  resetDfspHubSC,
  setDfspHubSCError,
  setDfspHubSCRootCertificate,
  setDfspHubSCIntermediateChain,
  setDfspHubSCServerCertificate,
  setDfspHubSCRootCertificateInfo,
  setDfspHubSCIntermediateChainInfo,
  setDfspHubSCServerCertificateInfo,
  setDfspHubSCValidations,
  setDfspHubSCValidationState,
  showDfspHubSCRootCertificateModal,
  hideDfspHubSCRootCertificateModal,
  showDfspHubSCIntermediateChainModal,
  hideDfspHubSCIntermediateChainModal,
  showDfspHubSCServerCertificateModal,
  hideDfspHubSCServerCertificateModal,
  storeDfspHubSCServerCertificate,
} from './actions';

import {
  getDfspHubSCError,
  getDfspHubSCServerCertificate,
  getDfspHubSCRootCertificate,
  getDfspHubSCIntermediateChain,
  getDfspHubSCServerCertificateInfo,
  getDfspHubSCRootCertificateInfo,
  getDfspHubSCIntermediateChainInfo,
  getDfspHubSCValidations,
  getDfspHubSCValidationState,
  getIsDfspHubSCServerCertificateModalVisible,
  getIsDfspHubSCRootCertificateModalVisible,
  getIsDfspHubSCIntermediateChainModalVisible,
  getIsDfspHubSCPending,
} from './selectors';

import { getIsSuccessToastVisible, getIsErrorModalVisible } from 'App/selectors';

import { initialState } from './reducers';

let dispatch;
let getState;

describe('Test the dfsp server certificate actions', () => {
  beforeEach(async () => {
    const store = getStore();
    ({ dispatch, getState } = store);
  });

  it('Should reset the reducers', () => {
    dispatch(resetDfspHubSC());
    expect(getState().dfsp.tls.server.hub).toEqual(initialState);
  });

  it('Should set the error', () => {
    dispatch(setDfspHubSCError('ERROR'));
    expect(getDfspHubSCError(getState())).toBe('ERROR');
  });

  it('Should set the server certificate', () => {
    dispatch(setDfspHubSCServerCertificateInfo('SERVER_CERT'));
    expect(getDfspHubSCServerCertificateInfo(getState())).toBe('SERVER_CERT');
  });

  it('Should set the root certificate', () => {
    dispatch(setDfspHubSCRootCertificateInfo('ROOT_CERT'));
    expect(getDfspHubSCRootCertificateInfo(getState())).toBe('ROOT_CERT');
  });

  it('Should set the intermediate chain', () => {
    dispatch(setDfspHubSCIntermediateChainInfo('CHAIN'));
    expect(getDfspHubSCIntermediateChainInfo(getState())).toBe('CHAIN');
  });

  it('Should set the server certificate info', () => {
    dispatch(setDfspHubSCServerCertificate('SERVER_CERT_INFO'));
    expect(getDfspHubSCServerCertificate(getState())).toBe('SERVER_CERT_INFO');
  });

  it('Should set the root certificate info', () => {
    dispatch(setDfspHubSCRootCertificate('ROOT_CERT_INFO'));
    expect(getDfspHubSCRootCertificate(getState())).toBe('ROOT_CERT_INFO');
  });

  it('Should set the intermediate chain info', () => {
    dispatch(setDfspHubSCIntermediateChain('CHAIN'));
    expect(getDfspHubSCIntermediateChain(getState())).toBe('CHAIN');
  });

  it('Should set the validations', () => {
    dispatch(setDfspHubSCValidations([]));
    expect(getDfspHubSCValidations(getState())).toEqual([]);
  });

  it('Should set the validation state', () => {
    dispatch(setDfspHubSCValidationState('VALID'));
    expect(getDfspHubSCValidationState(getState())).toBe('VALID');
  });

  it('Should show the server certificate modal', () => {
    dispatch(showDfspHubSCServerCertificateModal());
    expect(getIsDfspHubSCServerCertificateModalVisible(getState())).toBe(true);
  });

  it('Should hide the server certificate modal', () => {
    dispatch(hideDfspHubSCServerCertificateModal());
    expect(getIsDfspHubSCServerCertificateModalVisible(getState())).toBe(false);
  });

  it('Should show the root certificate modal', () => {
    dispatch(showDfspHubSCRootCertificateModal());
    expect(getIsDfspHubSCRootCertificateModalVisible(getState())).toBe(true);
  });

  it('Should hide the root certificate modal', () => {
    dispatch(hideDfspHubSCRootCertificateModal());
    expect(getIsDfspHubSCRootCertificateModalVisible(getState())).toBe(false);
  });

  it('Should show the intermediate chain modal', () => {
    dispatch(showDfspHubSCIntermediateChainModal());
    expect(getIsDfspHubSCIntermediateChainModalVisible(getState())).toBe(true);
  });

  it('Should hide the intermediate chain modal', () => {
    dispatch(hideDfspHubSCIntermediateChainModal());
    expect(getIsDfspHubSCIntermediateChainModalVisible(getState())).toBe(false);
  });
});

describe('Test the dfsp server certificate thunk actions', () => {
  const fetchResponse = {
    serverCertificate: 'SERVER_CERT',
    rootCertificate: 'ROOT_CERT',
    intermediateChain: 'CHAIN',
    validations: [],
    validationState: 'VALID',
  };

  beforeEach(async () => {
    const store = prepareStore({ environments, environmentId: environments[0].id, dfsps, dfspId: dfsps[0].id });
    ({ dispatch, getState } = store);

    fetchMock.restore();
  });

  it('Should store the dfsp hub server certs', async () => {
    fetchMock.get('end:/servercerts', fetchResponse);
    await dispatch(storeDfspHubSCServerCertificate());
    expect(fetchMock.calls(MATCHED)).toHaveLength(1);
    expect(getDfspHubSCRootCertificate(getState())).toBe('ROOT_CERT');
    expect(getDfspHubSCIntermediateChain(getState())).toBe('CHAIN');
    expect(getDfspHubSCValidations(getState())).toEqual([]);
    expect(getDfspHubSCValidationState(getState())).toBe('VALID');
  });

  it('Should set the error when read operation is not successful', async () => {
    fetchMock.get('end:/servercerts', 500);
    await dispatch(storeDfspHubSCServerCertificate());
    expect(fetchMock.calls(MATCHED)).toHaveLength(1);
    expect(getDfspHubSCError(getState()).status).toBe(500);
    expect(getDfspHubSCError(getState()).error).toBe(undefined);
  });
});

describe('Test the api pending selectors', () => {
  const fetchResponse = {
    rootCertificate: 'ROOT_CERT',
    intermediateChain: 'CHAIN',
    validations: [],
    validationState: 'VALID',
  };

  beforeEach(async () => {
    const store = prepareStore({ environments, environmentId: environments[0].id, dfsps, dfspId: dfsps[0].id });
    ({ dispatch, getState } = store);

    fetchMock.restore();
  });

  it('Should detect the api is pending when reading', () => {
    fetchMock.get('end:/servercerts', fetchResponse);
    dispatch(storeDfspHubSCServerCertificate());
    expect(getIsDfspHubSCPending(getState())).toBe(true);
  });

  it('Should detect the api is not pending when finished reading', async () => {
    fetchMock.get('end:/servercerts', fetchResponse);
    await dispatch(storeDfspHubSCServerCertificate());
    expect(getIsDfspHubSCPending(getState())).not.toBe(true);
  });
});

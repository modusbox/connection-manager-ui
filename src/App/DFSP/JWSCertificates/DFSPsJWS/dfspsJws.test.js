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
  resetDfspsJWS,
  setDfspsJWSError,
  setDfspsJWSFilter,
  setDfspsJWSCertificates,
  showDfspsJWSIntermediateChainModal,
  hideDfspsJWSIntermediateChainModal,
  showDfspsJWSJwsCertificateModal,
  hideDfspsJWSJwsCertificateModal,
  storeDfspsJWSCertificates,
} from './actions';

import {
  getDfspsJWSError,
  getDfspsJWSFilter,
  getDfspsJWSCertificates,
  getDfspsJWSJwsCertificateModalContent,
  getDfspsJWSIntermediateChainModalContent,
  getIsDfspsJWSJwsCertificateModalVisible,
  getIsDfspsJWSIntermediateChainModalVisible,
  getIsDfspsJWSPending,
} from './selectors';

import { initialState } from './reducers';

let dispatch;
let getState;

describe('Test the dfsp jws certificate actions', () => {
  beforeEach(async () => {
    const store = getStore();
    ({ dispatch, getState } = store);
  });

  it('Should reset the reducers', () => {
    dispatch(resetDfspsJWS());
    expect(getState().dfsp.jws.dfsps).toEqual(initialState);
  });

  it('Should set the error', () => {
    dispatch(setDfspsJWSError('ERROR'));
    expect(getDfspsJWSError(getState())).toBe('ERROR');
  });

  it('Should set the filter', () => {
    dispatch(setDfspsJWSFilter('FILTER'));
    expect(getDfspsJWSFilter(getState())).toBe('FILTER');
  });

  it('Should set the jws certificates', () => {
    dispatch(setDfspsJWSCertificates([]));
    expect(getDfspsJWSCertificates(getState())).toEqual([]);
  });

  it('Should show the jws certificate modal', () => {
    dispatch(showDfspsJWSJwsCertificateModal('TEST'));
    expect(getIsDfspsJWSJwsCertificateModalVisible(getState())).toBe(true);
    expect(getDfspsJWSJwsCertificateModalContent(getState())).toBe('TEST');
  });

  it('Should hide the jws certificate modal', () => {
    dispatch(hideDfspsJWSJwsCertificateModal());
    expect(getIsDfspsJWSJwsCertificateModalVisible(getState())).toBe(false);
    expect(getDfspsJWSJwsCertificateModalContent(getState())).toBe(undefined);
  });

  it('Should show the intermediate chain modal', () => {
    dispatch(showDfspsJWSIntermediateChainModal('TEST'));
    expect(getIsDfspsJWSIntermediateChainModalVisible(getState())).toBe(true);
    expect(getDfspsJWSIntermediateChainModalContent(getState())).toBe('TEST');
  });

  it('Should hide the intermediate chain modal', () => {
    dispatch(hideDfspsJWSIntermediateChainModal());
    expect(getIsDfspsJWSIntermediateChainModalVisible(getState())).toBe(false);
    expect(getDfspsJWSIntermediateChainModalContent(getState())).toBe(undefined);
  });
});

describe('Test the dfsp jws certificate thunk actions', () => {
  const fetchResponse = [
    {
      jwsCertificate: 'JWS_CERT',
      intermediateChain: 'CHAIN',
      validations: [],
      validationState: 'VALID',
      dfspId: dfsps[1].id,
    },
  ];

  beforeEach(async () => {
    const store = prepareStore({ environments, environmentId: environments[0].id, dfsps, dfspId: dfsps[0].id });
    ({ dispatch, getState } = store);

    fetchMock.restore();
  });

  it('Should store the dfsps jws', async () => {
    fetchMock.get('end:/jwscerts', fetchResponse);
    await dispatch(storeDfspsJWSCertificates());
    expect(fetchMock.calls(MATCHED)).toHaveLength(1);
    expect(getDfspsJWSCertificates(getState())).toHaveLength(fetchResponse.length);
  });

  it('Should set the error when read operation is not successful', async () => {
    fetchMock.get('end:/jwscerts', 500);
    await dispatch(storeDfspsJWSCertificates());
    expect(fetchMock.calls(MATCHED)).toHaveLength(1);
    expect(getDfspsJWSError(getState())).toBe('Generic');
  });
});

describe('Test the api pending selectors', () => {
  const fetchResponse = [
    {
      jwsCertificate: 'JWS_CERT',
      intermediateChain: 'CHAIN',
      validations: [],
      validationState: 'VALID',
      dfspId: dfsps[1].id,
    },
  ];

  beforeEach(async () => {
    const store = prepareStore({ environments, environmentId: environments[0].id, dfsps, dfspId: dfsps[0].id });
    ({ dispatch, getState } = store);

    fetchMock.restore();
  });

  it('Should detect the api is pending when reading', () => {
    fetchMock.get('end:/jwscerts', fetchResponse);
    dispatch(storeDfspsJWSCertificates());
    expect(getIsDfspsJWSPending(getState())).toBe(true);
  });

  it('Should detect the api is not pending when finished reading', async () => {
    fetchMock.get('end:/jwscerts', fetchResponse);
    await dispatch(storeDfspsJWSCertificates());
    expect(getIsDfspsJWSPending(getState())).not.toBe(true);
  });
});

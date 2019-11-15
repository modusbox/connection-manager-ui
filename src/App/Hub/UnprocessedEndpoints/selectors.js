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
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import get from 'lodash/get';
import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';
import * as testers from 'utils/testers';
import { DIRECTIONS, TYPES } from '../constants';
import { getDfsps } from 'App/selectors';

export const getHubUnprocessedEndpoints = state => state.hub.unprocessed.hubUnprocessedEndpoints;
export const getHubUnprocessedEndpointsError = state => state.hub.unprocessed.hubUnprocessedEndpointsError;
export const getUnprocessedEndpointsFilter = state => state.hub.unprocessed.unprocessedEndpointsFilter;
export const getConfirming = state => state.hub.unprocessed.confirming;

export const getHubHasUnprocessedEndpoints = createSelector(
  getHubUnprocessedEndpoints,
  testers.isNotEmptyCollection
);

export const getHubUnprocessedEndpointsByDFSP = createSelector(
  getHubUnprocessedEndpoints,
  getUnprocessedEndpointsFilter,
  getDfsps,
  getConfirming,
  (endpoints, filter, dfsps, confirming) => {
    const hasDirection = direction => endpoint => endpoint.direction === direction;
    const addConfirmingFlag = flags => endpoint => ({
      // every endpoint can be checked singularly
      // and they start all checked by default
      ...endpoint,
      checked: confirming[endpoint.id] !== false,
    });
    const isChecked = endpoint => endpoint.checked === true;

    const groupedByDfspId = groupBy(endpoints, 'dfsp_id');
    const dfspIds = Object.keys(groupedByDfspId);

    return dfspIds
      .map(dfspId => ({
        dfspId,
        dfspName: get(find(dfsps, { id: dfspId }), 'name') || '',
        endpoints: groupedByDfspId[dfspId],
      }))
      .filter(item => item.dfspName.toLowerCase().includes(filter.toLowerCase()))
      .map(({ dfspId, dfspName, endpoints }) => {
        const egressEndpoints = endpoints.filter(hasDirection(DIRECTIONS.EGRESS));
        const ingressEndpoints = endpoints.filter(hasDirection(DIRECTIONS.INGRESS));
        const sortedIngress = sortBy(ingressEndpoints, { type: TYPES.IP });

        const egress = egressEndpoints.map(addConfirmingFlag(confirming));
        const ingress = sortedIngress.map(addConfirmingFlag(confirming));

        const isEgressSubmitEnabled = egress.length > 0 && egress.some(isChecked);
        const isIngressSubmitEnabled = ingress.length > 0 && ingress.some(isChecked);

        return {
          dfspId,
          dfspName,
          egress,
          ingress,
          isEgressSubmitEnabled,
          isIngressSubmitEnabled,
        };
      });
  }
);

export const getDfspNamesByDFSP = createSelector(
  getHubUnprocessedEndpointsByDFSP,
  getDfsps,
  (dfspEndpoints, dfsps) => dfspEndpoints.map(endpoints => null)
);

const getIsunprocessedEndpointsReadPending = createPendingSelector('unprocessedEndpoints.read');
const getIsconfirmEndpointsCreatePending = createPendingSelector('confirmEndpoint.create');

export const getIsUnprocessedEndpointsLoading = createSelector(
  getIsunprocessedEndpointsReadPending,
  getIsconfirmEndpointsCreatePending,
  testers.getAnyIs(true)
);

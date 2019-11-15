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

import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  CertificateInfo,
  CertificateModal,
  CertificateValidation,
  FileControls,
  FormInput,
  MessageBox,
} from 'components';
import { getEnvironmentName } from 'App/selectors';
import {
  changeDfspJWSJwsCertificate,
  downloadDfspJWSJwsCertificate,
  showDfspJWSJwsCertificateModal,
  hideDfspJWSJwsCertificateModal,
  changeDfspJWSIntermediateChain,
  downloadDfspJWSIntermediateChain,
  showDfspJWSIntermediateChainModal,
  hideDfspJWSIntermediateChainModal,
  submitDfspJWSCertificates,
} from './actions';
import {
  getDfspJWSError,
  getDfspJWSJwsCertificate,
  getDfspJWSIntermediateChain,
  getDfspJWSJwsCertificateInfo,
  getDfspJWSIntermediateChainInfo,
  getDfspJWSValidations,
  getDfspJWSValidationState,
  getIsDfspJWSJwsCertificateModalVisible,
  getIsDfspJWSIntermediateChainModalVisible,
  getIsDfspJWSSubmitEnabled,
  getIsDfspJWSSubmitPending,
} from './selectors';

import './index.css';

const stateProps = state => ({
  environmentName: getEnvironmentName(state),
  error: getDfspJWSError(state),
  jwsCertificate: getDfspJWSJwsCertificate(state),
  intermediateChain: getDfspJWSIntermediateChain(state),
  jwsCertificateInfo: getDfspJWSJwsCertificateInfo(state),
  intermediateChainInfo: getDfspJWSIntermediateChainInfo(state),
  validations: getDfspJWSValidations(state),
  validationState: getDfspJWSValidationState(state),
  isJwsCertificateModalVisible: getIsDfspJWSJwsCertificateModalVisible(state),
  isIntermediateChainModalVisible: getIsDfspJWSIntermediateChainModalVisible(state),
  isSubmitEnabled: getIsDfspJWSSubmitEnabled(state),
  isSubmitPending: getIsDfspJWSSubmitPending(state),
});

const actionProps = dispatch => ({
  onJwsCertificateChange: cert => dispatch(changeDfspJWSJwsCertificate(cert)),
  onJwsCertificateViewClick: () => dispatch(showDfspJWSJwsCertificateModal()),
  onJwsCertificateDownloadClick: () => dispatch(downloadDfspJWSJwsCertificate()),
  onJwsCertificateModalCloseClick: () => dispatch(hideDfspJWSJwsCertificateModal()),
  onIntermediateChainChange: cert => dispatch(changeDfspJWSIntermediateChain(cert)),
  onIntermediateChainDownloadClick: () => dispatch(downloadDfspJWSIntermediateChain()),
  onIntermediateChainViewClick: () => dispatch(showDfspJWSIntermediateChainModal()),
  onIntermediateChainModalCloseClick: () => dispatch(hideDfspJWSIntermediateChainModal()),
  onCreateCertificateClick: () => dispatch(submitDfspJWSCertificates()),
});

const DfspJWS = ({
  environmentName,
  error,
  jwsCertificate,
  intermediateChain,
  jwsCertificateInfo,
  intermediateChainInfo,
  validations,
  validationState,
  isJwsCertificateModalVisible,
  isIntermediateChainModalVisible,
  isSubmitEnabled,
  isSubmitPending,
  onJwsCertificateChange,
  onJwsCertificateViewClick,
  onJwsCertificateDownloadClick,
  onJwsCertificateModalCloseClick,
  onIntermediateChainChange,
  onIntermediateChainViewClick,
  onIntermediateChainDownloadClick,
  onIntermediateChainModalCloseClick,
  onCreateCertificateClick,
}) => {
  if (error) {
    return (
      <MessageBox
        icon="warning-sign"
        kind="error"
        message="There was an error while loading the certificates"
        center
        size={30}
        fontSize={17}
      />
    );
  }

  return (
    <div className="dfsp__dfsp-jws">
      <div className="dfsp__dfsp-jws__submit__container">
        <Button
          className="dfsp__dfsp-jws__submit"
          label="Submit"
          onClick={onCreateCertificateClick}
          disabled={!isSubmitEnabled}
          pending={isSubmitPending}
          icon="check-small"
        />
      </div>

      <div className="dfsp__dfsp-jws__certificate-validation">
        <CertificateValidation validations={validations} state={validationState} type="certificate" />
      </div>

      <div className="dfsp__dfsp-jws__certificate-item">
        <div className="dfsp__dfsp-jws__jws-certificate">
          <FormInput
            type="file"
            label="JWS Certificate"
            parseFileAsText
            onChange={onJwsCertificateChange}
            elementWidth="400px"
            value={jwsCertificate || null}
            fileName={`${environmentName}-jws.pem`}
            required
          />
          {jwsCertificate && (
            <FileControls onViewClick={onJwsCertificateViewClick} onDownloadClick={onJwsCertificateDownloadClick} />
          )}
        </div>
        {jwsCertificateInfo && <CertificateInfo certInfo={jwsCertificateInfo} />}
      </div>

      <div className="dfsp__dfsp-jws__certificate-item">
        <div className="dfsp__dfsp-jws__intermediate-chain">
          <FormInput
            type="file"
            label="Intermediate Chain"
            parseFileAsText
            onChange={onIntermediateChainChange}
            value={intermediateChain || null}
            fileName={`${environmentName}-intermediates.pem`}
            elementWidth="400px"
          />
          {intermediateChain && (
            <FileControls
              onViewClick={onIntermediateChainViewClick}
              onDownloadClick={onIntermediateChainDownloadClick}
            />
          )}
        </div>
        {intermediateChainInfo && <CertificateInfo certInfo={intermediateChainInfo} />}
      </div>

      {isJwsCertificateModalVisible && (
        <CertificateModal onClose={onJwsCertificateModalCloseClick} content={jwsCertificate} title="JWS Certificate" />
      )}
      {isIntermediateChainModalVisible && (
        <CertificateModal
          onClose={onIntermediateChainModalCloseClick}
          content={intermediateChain}
          title="Intermediate Chain"
        />
      )}
    </div>
  );
};
export default connect(
  stateProps,
  actionProps
)(DfspJWS);

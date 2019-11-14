import React from 'react';
import { connect } from 'react-redux';
import { Button, ControlIcon, FormInput, MessageBox, Spinner, Status } from 'components';
import { withMount } from 'utils/hocs';
import './Egress.css';
import {
  getEgressIps,
  getEgressError,
  getEgressIpsValidationResult,
  getIsEgressIpsSubmitEnabled,
  getIsEgressPending,
  getIsEgressSubmitPending,
  getIsEgressChanged,
} from './selectors';
import {
  storeDfspEgressIps,
  addDfspEgressIp,
  removeDfspEgressIp,
  changeDfspEgressAddress,
  changeDfspEgressPort,
  addDfspEgressPort,
  removeDfspEgressPort,
  submitDfspEgressIps,
  undoDfspEgressChanges,
} from './actions';

const stateProps = state => ({
  ips: getEgressIps(state),
  error: getEgressError(state),
  validation: getEgressIpsValidationResult(state),
  isSubmitEnabled: getIsEgressIpsSubmitEnabled(state),
  isPending: getIsEgressPending(state),
  isSubmitPending: getIsEgressSubmitPending(state),
  isChanged: getIsEgressChanged(state),
});

const actionProps = dispatch => ({
  onMount: () => dispatch(storeDfspEgressIps()),
  onAddIpClick: () => dispatch(addDfspEgressIp()),
  onRemoveIpClick: index => dispatch(removeDfspEgressIp(index)),
  onChangeAddress: (address, index) => dispatch(changeDfspEgressAddress({ address, index })),
  onChangePort: (port, portIndex, index) => dispatch(changeDfspEgressPort({ port, portIndex, index })),
  onAddPortClick: index => dispatch(addDfspEgressPort(index)),
  onRemovePortClick: (portIndex, index) => dispatch(removeDfspEgressPort({ portIndex, index })),
  onSubmitClick: () => dispatch(submitDfspEgressIps()),
  onUndoClick: () => dispatch(undoDfspEgressChanges()),
});

const Egress = ({
  ips,
  error,
  validation,
  isPending,
  isSubmitEnabled,
  isSubmitPending,
  isChanged,
  onAddIpClick,
  onChangeAddress,
  onChangePort,
  onAddPortClick,
  onRemovePortClick,
  onRemoveIpClick,
  onSubmitClick,
  onUndoClick,
}) => {
  if (isPending) {
    return <Spinner center size={20} />;
  } else if (error) {
    return (
      <MessageBox
        icon="warning-sign"
        kind="error"
        message="There was an error while loading the endpoints"
        center
        size={30}
        fontSize={17}
      />
    );
  }
  return (
    <div>
      <div className="egress____buttons">
        <Button
          className="egress____button"
          label="Submit for Confirmation"
          disabled={!isSubmitEnabled}
          onClick={onSubmitClick}
          pending={isSubmitPending}
        />
        <Button
          className="egress____button"
          label="Add Additional IP Address"
          icon="plus-small"
          noFill
          onClick={onAddIpClick}
        />
        <Button
          className="egress____button"
          label="Undo Changes"
          disabled={!isChanged}
          onClick={onUndoClick}
          kind="secondary"
          noFill
        />
      </div>

      {ips.map((egressIp, index) => (
        <EgressIp
          address={egressIp.address}
          ports={egressIp.ports}
          state={egressIp.state}
          onChangeAddress={onChangeAddress}
          onChangePort={onChangePort}
          onAddPort={onAddPortClick}
          onRemovePort={onRemovePortClick}
          onRemoveIp={onRemoveIpClick}
          validation={validation}
          index={index}
          key={index}
        />
      ))}
    </div>
  );
};

const EgressIp = ({
  index,
  state,
  address,
  ports,
  validation,
  onChangeAddress,
  onChangePort,
  onAddPort,
  onRemovePort,
  onRemoveIp,
}) => (
  <div className="egress__ip__row">
    <div className="egress__ip__remove">
      <ControlIcon
        icon="close-small"
        size={20}
        tooltip={index === 0 ? 'The first IP cannot be removed' : 'Remove IP'}
        kind="danger"
        onClick={() => onRemoveIp(index)}
        disabled={index === 0}
      />
    </div>
    <div className="egress__ip__controls">
      <div className="egress__ip__fields">
        <div className="egress__ip__address__container">
          <div className="egress__ip__address">
            <FormInput
              type="text"
              placeholder="Egress IP Address"
              value={address}
              onChange={address => onChangeAddress(address, index)}
              validation={validation[index].address}
            />
          </div>
        </div>
        {ports.map((port, portIndex) => (
          <div className="egress__ip__port__container" key={portIndex}>
            <div className="egress__ip__port">
              <FormInput
                type="text"
                placeholder="Port(s)"
                value={port}
                onChange={value => onChangePort(value, portIndex, index)}
                validation={validation[index].ports[portIndex]}
              />
            </div>
            {portIndex > 0 && (
              <ControlIcon
                icon="close-small"
                className="egress__ip__port-remove"
                size={16}
                tooltip="Remove Port"
                kind="error"
                onClick={() => onRemovePort(portIndex, index)}
                disabled={portIndex === 0}
              />
            )}
          </div>
        ))}
        <Button
          label="Add Port"
          icon="plus-small"
          className="egress__ip__port-add"
          onClick={() => onAddPort(index)}
          noFill
        />
      </div>
      <div className="egress__status__container">
        <Status.Endpoint state={state} />
      </div>
    </div>
  </div>
);

const MountedEgress = withMount(Egress, 'onMount');

export default connect(
  stateProps,
  actionProps
)(MountedEgress);

import { createValidation, vd } from 'modusbox-ui-components/dist/redux-validation';

const getHubDfspCsrsCertificateModalUploadValidation = () => ({
  certificate: createValidation([vd.isRequired]),
  hubCAId: createValidation([vd.isRequired]),
});

export { getHubDfspCsrsCertificateModalUploadValidation };

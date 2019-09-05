import { createValidation, vd } from 'modusbox-ui-components/dist/redux-validation';

const getTotpValidation = () => ({
  code: createValidation([vd.isRequired, vd.isLong(6)]),
});

export { getTotpValidation };

import * as yup from 'yup';

export const gpsDeviceValidationSchema = yup.object().shape({
  status: yup.string().required(),
  command: yup.string().required(),
  business_id: yup.string().nullable(),
});

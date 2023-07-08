import * as yup from 'yup';

export const gpsDataValidationSchema = yup.object().shape({
  data: yup.string().required(),
  gps_device_id: yup.string().nullable(),
});

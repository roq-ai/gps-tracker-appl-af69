import * as yup from 'yup';

export const serverValidationSchema = yup.object().shape({
  status: yup.string().required(),
  business_id: yup.string().nullable(),
});

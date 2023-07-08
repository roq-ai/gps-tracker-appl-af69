import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getGpsDataById, updateGpsDataById } from 'apiSdk/gps-data';
import { Error } from 'components/error';
import { gpsDataValidationSchema } from 'validationSchema/gps-data';
import { GpsDataInterface } from 'interfaces/gps-data';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { GpsDeviceInterface } from 'interfaces/gps-device';
import { getGpsDevices } from 'apiSdk/gps-devices';

function GpsDataEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<GpsDataInterface>(
    () => (id ? `/gps-data/${id}` : null),
    () => getGpsDataById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: GpsDataInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateGpsDataById(id, values);
      mutate(updated);
      resetForm();
      router.push('/gps-data');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<GpsDataInterface>({
    initialValues: data,
    validationSchema: gpsDataValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Gps Data
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="data" mb="4" isInvalid={!!formik.errors?.data}>
              <FormLabel>Data</FormLabel>
              <Input type="text" name="data" value={formik.values?.data} onChange={formik.handleChange} />
              {formik.errors.data && <FormErrorMessage>{formik.errors?.data}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<GpsDeviceInterface>
              formik={formik}
              name={'gps_device_id'}
              label={'Select Gps Device'}
              placeholder={'Select Gps Device'}
              fetcher={getGpsDevices}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.status}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'gps_data',
    operation: AccessOperationEnum.UPDATE,
  }),
)(GpsDataEditPage);

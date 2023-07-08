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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createGpsData } from 'apiSdk/gps-data';
import { Error } from 'components/error';
import { gpsDataValidationSchema } from 'validationSchema/gps-data';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { GpsDeviceInterface } from 'interfaces/gps-device';
import { getGpsDevices } from 'apiSdk/gps-devices';
import { GpsDataInterface } from 'interfaces/gps-data';

function GpsDataCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: GpsDataInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createGpsData(values);
      resetForm();
      router.push('/gps-data');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<GpsDataInterface>({
    initialValues: {
      data: '',
      gps_device_id: (router.query.gps_device_id as string) ?? null,
    },
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
            Create Gps Data
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
    operation: AccessOperationEnum.CREATE,
  }),
)(GpsDataCreatePage);

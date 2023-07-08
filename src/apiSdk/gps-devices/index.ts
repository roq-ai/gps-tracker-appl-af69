import axios from 'axios';
import queryString from 'query-string';
import { GpsDeviceInterface, GpsDeviceGetQueryInterface } from 'interfaces/gps-device';
import { GetQueryInterface } from '../../interfaces';

export const getGpsDevices = async (query?: GpsDeviceGetQueryInterface) => {
  const response = await axios.get(`/api/gps-devices${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGpsDevice = async (gpsDevice: GpsDeviceInterface) => {
  const response = await axios.post('/api/gps-devices', gpsDevice);
  return response.data;
};

export const updateGpsDeviceById = async (id: string, gpsDevice: GpsDeviceInterface) => {
  const response = await axios.put(`/api/gps-devices/${id}`, gpsDevice);
  return response.data;
};

export const getGpsDeviceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/gps-devices/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGpsDeviceById = async (id: string) => {
  const response = await axios.delete(`/api/gps-devices/${id}`);
  return response.data;
};

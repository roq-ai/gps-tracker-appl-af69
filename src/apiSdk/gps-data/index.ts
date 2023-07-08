import axios from 'axios';
import queryString from 'query-string';
import { GpsDataInterface, GpsDataGetQueryInterface } from 'interfaces/gps-data';
import { GetQueryInterface } from '../../interfaces';

export const getGpsData = async (query?: GpsDataGetQueryInterface) => {
  const response = await axios.get(`/api/gps-data${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGpsData = async (gpsData: GpsDataInterface) => {
  const response = await axios.post('/api/gps-data', gpsData);
  return response.data;
};

export const updateGpsDataById = async (id: string, gpsData: GpsDataInterface) => {
  const response = await axios.put(`/api/gps-data/${id}`, gpsData);
  return response.data;
};

export const getGpsDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/gps-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGpsDataById = async (id: string) => {
  const response = await axios.delete(`/api/gps-data/${id}`);
  return response.data;
};

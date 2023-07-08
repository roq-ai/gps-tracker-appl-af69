import { GpsDeviceInterface } from 'interfaces/gps-device';
import { GetQueryInterface } from 'interfaces';

export interface GpsDataInterface {
  id?: string;
  data: string;
  gps_device_id?: string;
  created_at?: any;
  updated_at?: any;

  gps_device?: GpsDeviceInterface;
  _count?: {};
}

export interface GpsDataGetQueryInterface extends GetQueryInterface {
  id?: string;
  data?: string;
  gps_device_id?: string;
}

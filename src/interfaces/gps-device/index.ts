import { GpsDataInterface } from 'interfaces/gps-data';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface GpsDeviceInterface {
  id?: string;
  status: string;
  command: string;
  business_id?: string;
  created_at?: any;
  updated_at?: any;
  gps_data?: GpsDataInterface[];
  business?: BusinessInterface;
  _count?: {
    gps_data?: number;
  };
}

export interface GpsDeviceGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  command?: string;
  business_id?: string;
}

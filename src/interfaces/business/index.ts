import { GpsDeviceInterface } from 'interfaces/gps-device';
import { ServerInterface } from 'interfaces/server';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BusinessInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  gps_device?: GpsDeviceInterface[];
  server?: ServerInterface[];
  user?: UserInterface;
  _count?: {
    gps_device?: number;
    server?: number;
  };
}

export interface BusinessGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}

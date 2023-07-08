import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface ServerInterface {
  id?: string;
  status: string;
  business_id?: string;
  created_at?: any;
  updated_at?: any;

  business?: BusinessInterface;
  _count?: {};
}

export interface ServerGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  business_id?: string;
}

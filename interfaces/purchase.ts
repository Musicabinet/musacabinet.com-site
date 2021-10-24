import { SERVICE_ID } from '../constants';
import { Moment } from 'moment';

export interface PurchaseI {
  id: number;
  user_id: number;
  service_id: SERVICE_ID;
  instrument_id: number;
  product_id: number;
  price: number;
  date_start: Moment;
  date_end: Moment;
  days_passed: number;
  days_remain: number;
}

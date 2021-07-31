import { SERVICE_ID } from '../constants';
import { Moment } from 'moment';

export interface PurchaseI{
  id: number,
  user_id: number,
  service_id: SERVICE_ID,
  instrument_id: number,
  date_start: Moment,
  date_end: Moment
}

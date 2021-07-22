import { Moment } from 'moment';

export interface TrialVersionI {
  id: number,
  user_id: number,
  date_start: Moment,
  date_end: Moment
}

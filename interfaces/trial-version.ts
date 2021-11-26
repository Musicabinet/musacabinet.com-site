import { Moment } from 'moment';

export interface TrialVersionI {
  user_id: number,
  date_start: Moment,
  date_end: Moment,
  days_passed: number,
  days_remain: number,
  is_valid: boolean,
}

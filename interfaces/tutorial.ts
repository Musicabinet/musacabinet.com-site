import { Moment } from 'moment';

export interface TutorialI{
  id: number,
  service_id: number,
  title: string,
  description: string,
  content: string,
  created_at: Moment,
  updated_at: Moment
}

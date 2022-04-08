import { Moment } from 'moment';

export interface LessonProgressMonthI {
  id: number,
  user_id: number,
  datetime: Moment,
  progress_hours: number
}

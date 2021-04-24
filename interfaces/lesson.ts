import { ScoreI } from './score';
import { GroupLessonI } from './group-lesson';
import { AccompanimentI } from './accompaniment';

export interface LessonI {
  id: number,
  uuid: string,
  group_lesson_id: number | undefined,
  sort: number,
  slug: string,
  meta_title: string,
  meta_description: string,
  meta_keywords: string,
  name: string,
  description: string,
  duration_minute: number,
  is_active: boolean,
  scores: ScoreI[],
  group_lesson?: GroupLessonI | undefined,
  accompaniments: AccompanimentI[]
}

import { ScoreI } from './score';
import { AccompanimentI } from './accompaniment';
import { GroupLessonStore } from '../stores/group-lesson';
import { BreadcrumbsI } from './breadcrumbs';
import { ChartI } from './chart';

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
  charts: ChartI[],
  group_lesson?: GroupLessonStore | undefined,
  accompaniments: AccompanimentI[],
  breadcrumbs: BreadcrumbsI[]
  progress_second: number,
  lesson_list: LessonListI[],
  prevModuleLesson?: null | string,
  nextModuleLesson?: null | string,
  selected_accompaniment?: number
}

export interface LessonListI {
  'id': number,
  'uuid': string,
  'name': string
}

export enum LessonDirection {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface LessonExtraParamsI {
}

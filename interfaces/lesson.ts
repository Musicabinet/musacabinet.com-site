import { GroupLessonStore } from '../stores';
import { BreadcrumbsI } from './breadcrumbs';
import { AccompanimentStore } from '../stores/accompaniment';
import { ScoreStore } from '../stores/score';
import { ChartStore } from '../stores/chart';

export interface LessonI {
  id: number;
  uuid: string;
  group_lesson_id: number | undefined;
  sort: number;
  slug: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  name: string;
  description: string;
  duration_minute: number;
  is_active: boolean;
  scores: ScoreStore[];
  charts: ChartStore[];
  group_lesson?: GroupLessonStore | undefined;
  accompaniments: AccompanimentStore[];
  breadcrumbs: BreadcrumbsI[];
  progress_second: number;
  lesson_list: LessonListI[];
  prevModuleLesson?: null | string;
  nextModuleLesson?: null | string;
  selected_accompaniment?: number;
}

export interface LessonListI {
  id: number;
  uuid: string;
  name: string;
}

export enum LessonDirection {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface LessonExtraParamsI {}

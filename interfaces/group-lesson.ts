import { LessonI } from './lesson';
import { CollectionI } from './collection';

export interface GroupLessonI {
  id: number,
  collection_id: number | undefined,
  sort: number,
  slug: string,
  meta_title: string,
  meta_description: string,
  meta_keywords: string,
  name: string,
  description: string,
  is_active: boolean,
  collections?: CollectionI | null
  module_id: number,
  course_id: number,
  total_lessons: number,
  lessons: LessonI[],

}

export interface GroupLessonsFinal {
  [key: string]: GroupLessonI[]
}

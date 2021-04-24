import { LessonI } from './lesson';

export interface GroupLessonI {
  id: number,
  name: string,
  collection_id: number,
  module_id: number,
  course_id: number,
  total_lessons: number,
  lessons: LessonI[]
}

export interface GroupLessonsFinal {
  [key: string]: GroupLessonI[]
}

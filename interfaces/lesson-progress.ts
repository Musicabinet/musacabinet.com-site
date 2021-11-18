import { StatisticsLessonProgressStore } from '../stores/statistics-lesson-progress';
import { StatisticsLessonsProgressStore } from '../stores/statistics-lessons-progress';

export interface StatisticsLessonsProgressI {
  course_id: number,
  module_id: number,
  collection_id: number,
  lessons: StatisticsLessonProgressStore[]
}

export interface StatisticsLessonProgressI {
  lesson_id: number,
  uuid: string,
  duration_minute: number,
  total_progress_minute: number
}

export interface StatisticsItemI {
  [key: string]: StatisticsLessonsProgressStore[]
}

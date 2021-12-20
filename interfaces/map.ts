export interface MapI {
  [key: string]: MapStructureI[]
}

export interface MapStructureI {
  course_id: number,
  module_id: number,
  collection_id: number,
  lessons: MapLessonI[]
}

export interface MapLessonI{
  lesson_id: number,
  uuid: string,
  duration_minute: number,
  total_progress_minute: number,
  percent_pass: number
}

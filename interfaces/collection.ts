import { RelationIdNameI } from './index';

export interface CollectionI{
  id: number,
  sort: number,
  service_id: number,
  instrument_id: number | undefined,
  course_id: number | undefined,
  module_id: number | undefined,
  is_active: boolean,
  instruments?: RelationIdNameI | null,
  courses?: RelationIdNameI | null,
  modules?: RelationIdNameI | null,

  instrumentName: string,
  courseName: string,
  moduleName: string,
}

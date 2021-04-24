import { LibraryI } from './library';

export interface AccompanimentI {
  id: number,
  lesson_id: number,
  sort: number,
  name: string,
  libraries: LibraryI[]
}

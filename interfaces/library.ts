import { LibraryTrackType, LibraryType } from '../constants';

export interface LibraryI {
  id: number,
  uuid: string,
  sort: number,
  service_id: number,
  name: string,
  type: LibraryType,
  is_active: boolean,
  tracks: LibraryTrackI[],
  TRACK?: any,
  BASS?: any,
  DRUMS?: any,
  KEYBOARDS?: any
}

export interface LibraryTrackI {
  id: number,
  library_id: number,
  name: string,
  origin_name: string,
  type: LibraryTrackType
}

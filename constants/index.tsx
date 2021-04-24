export enum METHODS_REQUEST {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT'
}

export enum TITLE_SIZE {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third'
}

export enum SOCIAL_BUTTON_TYPE {
  FACEBOOK = 'facebook',
  GOOGLE = 'google'
}

export enum NOTIFICATION_TYPE {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export enum ICONS_NAME {
  GUITAR = 'guitar',
  KEYBOARD = 'keyboard',
  SAXOPHONE = 'saxophone'
}

export enum SERVICE_NAME {
  SCHOOL = 'school',
  COLLEGE = 'college',
  UNIVERSITY = 'university'
}

export const SERVICE_MAPPING = {
  1: SERVICE_NAME.SCHOOL,
  2: SERVICE_NAME.COLLEGE,
  3: SERVICE_NAME.UNIVERSITY
};

export enum LibraryType {
  SINGLE = 'SINGLE',
  COMPOSITION = 'COMPOSITION'
}

export enum LibraryTrackType {
  TRACK = 'TRACK',
  BASS = 'BASS',
  DRUMS = 'DRUMS',
  KEYBOARDS = 'KEYBOARDS',
}

export enum LibraryTypeMAPPING {
  SINGLE = 'Дорожка',
  COMPOSITION = 'Композиция'
}

export enum SCORE_TYPE {
  TITLE = 1,
  IMAGE = 2
}

export * from './modals';

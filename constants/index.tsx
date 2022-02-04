export * from './modals';
export * from './stripe-prices';

export enum METHODS_REQUEST {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT'
}

export enum TITLE_SIZE {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
  FOURTH = 'fourth',
  SERVICE_PAGE = 'service-page'
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

export enum SERVICE_ID {
  SCHOOL = 1,
  COLLEGE = 2,
  UNIVERSITY = 3
}

export const SERVICE_MAPPING = {
  [SERVICE_ID.SCHOOL]: SERVICE_NAME.SCHOOL,
  [SERVICE_ID.COLLEGE]: SERVICE_NAME.COLLEGE,
  [SERVICE_ID.UNIVERSITY]: SERVICE_NAME.UNIVERSITY
};

export enum LibraryType {
  SINGLE = 'SINGLE',
  COMPOSITION = 'COMPOSITION'
}

export enum LibraryTrackType {
  TRACK = 'TRACK',
  BASS = 'BASS',
  DRUMS = 'DRUMS',
  KEYBOARDS = 'KEYBOARDS'
}

export enum LibraryTypeMAPPING {
  SINGLE = 'Дорожка',
  COMPOSITION = 'Композиция'
}

export enum SCORE_TYPE {
  TITLE = 1,
  IMAGE = 2
}

export enum CHART_TYPE {
  TITLE = 1,
  IMAGE = 2
}

export const MAPPING_SERVICE_ID = {
  'school-guitar': 1,
  'school-keyboard': 1,
  'school-saxophone': 1,
  'college-guitar': 2,
  'college-keyboard': 2,
  'college-saxophone': 2,
  'university-guitar': 3,
  'university-keyboard': 3,
  'university-saxophone': 3
};

export const MAPPING_INSTRUMENT_ID = {
  'school-guitar': 1,
  'school-keyboard': 2,
  'school-saxophone': 4,
  'college-guitar': 3
};

export const SERVICE_SECOND_NEXT_MODULE = {
  [SERVICE_ID.SCHOOL]: 300,
  [SERVICE_ID.COLLEGE]: 600,
  [SERVICE_ID.UNIVERSITY]: 900
};

export const SERVICE_DURATION_MINUTE = {
  [SERVICE_ID.SCHOOL]: 30,
  [SERVICE_ID.COLLEGE]: 45,
  [SERVICE_ID.UNIVERSITY]: 60
};

export enum METRONOME_BUTTON_TYPE {
  INCREMENT = 'increment',
  DECREMENT = 'decrement'
};

export enum MODULE_BUTTON_TYPE {
  LEFT = 'left',
  RIGHT = 'right'
};


export enum METRONOME_CONST {
  VOLUME= 'METRONOME_VOLUME'
}

import { SCORE_TYPE } from '../constants';

export interface ScoreI {
  id: number,
  lesson_id: number,
  name: string,
  video_url: string,
  content: string
  items: []
}

export interface ScoreContentI {
  name: string,
  content: string
}

export interface ScoreItemI {
  id: number,
  sort: number,
  score_id: number,
  score_type_id: SCORE_TYPE,
  content: ScoreItemContentI
}

export interface ScoreItemContentI {
  image?: string,
  title?: string,
  align?: string
}

export interface ScoreItemSortI {
  id: number,
  sort: number
}

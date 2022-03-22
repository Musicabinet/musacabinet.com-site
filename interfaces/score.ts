import { SCORE_TYPE } from '../constants';
import { ScoreItemStore } from '../stores/score-item';

export interface ScoreI {
  id: number;
  lesson_id: number;
  name: string;
  sub_title: string;
  video_url: string;
  video_link: string;
  content: string;
  items: ScoreItemStore[];
}

export interface ScoreContentI {
  name: string;
  content: string;
}

export interface ScoreItemI {
  id: number;
  sort: number;
  score_id: number;
  score_type_id: SCORE_TYPE;
  content: ScoreItemContentI;
}

export interface ScoreItemContentI {
  image?: string;
  title?: string;
  align?: string;
}

export interface ScoreItemSortI {
  id: number;
  sort: number;
}

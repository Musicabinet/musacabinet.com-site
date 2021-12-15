import { CHART_TYPE } from '../constants';
import { ChartItemStore } from '../stores/chart-item';

export interface ChartI {
  id: number;
  lesson_id: number;
  title: string;
  sub_title: string;
  items: ChartItemStore[];
}

export interface ChartItemI {
  id: number;
  sort: number;
  chart_id: number;
  chart_type_id: CHART_TYPE;
  content: ChartItemContentI;
}

export interface ChartItemContentI {
  image?: string;
  title?: string;
  align?: string;
}

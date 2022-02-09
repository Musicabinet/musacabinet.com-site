import { AppContext } from 'next/app';
import { RootStore } from '../stores';
import { NextPageContext } from 'next';

export interface CustomAppContext extends AppContext {
  store?: RootStore;
}

export interface CustomPageContext extends NextPageContext {
  store?: RootStore;
  isServer: boolean;
}

export interface ImageTagI {
  path: string;
  className: string;
  alt: string;
}

export interface RelationIdNameI {
  id: number;
  name: string;
}

export interface MapProgressI{
  [key: string]: {
    total: number,
    progress: number
  }
}

export * from './menu';
export * from './auth';
export * from './user';
export * from './notification';
export * from './instrument';
export * from './service';
export * from './course';
export * from './module';
export * from './collection';
export * from './accompaniment';
export * from './lesson';
export * from './library';
export * from './score';
export * from './group-lesson';
export * from './breadcrumbs';
export * from './price';
export * from './trial-version';
export * from './purchase';
export * from './cloudpayment';
export * from './product';
export * from './tutorial';
export * from './lesson-progress';
export * from './map';

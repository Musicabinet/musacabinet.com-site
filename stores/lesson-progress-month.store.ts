import { action, computed, makeObservable, observable } from 'mobx';
import { LessonProgressMonthItemStore } from './lesson-progress-month-item.store';
import { API } from '../core';
import { LessonProgressMonthI } from '../interfaces';
import moment, { Moment } from 'moment';

export class LessonProgressMonthStore {

  @observable list: LessonProgressMonthItemStore[] = [];
  @observable map: { [key: string]: number } = {};
  @observable current_date: Moment = moment();

  constructor(initialData: LessonProgressMonthStore | null) {
    makeObservable(this);

    if (initialData) {
      this.fillStore(initialData);
    }
  }

  @action.bound
  async getList() {
    try {
      const response = await API.request<LessonProgressMonthI[]>(`lesson-progress/by-month?date=${this.current_date.format('DD-MM-Y')}`);
      this.list = (response || []).map((lessonProgressMonth) => new LessonProgressMonthItemStore(lessonProgressMonth));

      // Собираем карту
      let completeData: { [key: string]: number } = {};
      this.list.forEach((item) => {
        completeData[item.datetime.format('D')] = item.progress_hours;
      });

      this.map = completeData;

    } catch (e) {
      console.error(`Error in method LessonProgressMonthStore.getList : `, e);
    }
  }

  @action.bound
  async nextMonth() {
    this.current_date = this.current_date.clone().add(1, 'month');
    await this.getList();
  }

  @action.bound
  async previousMonth() {
    this.current_date = this.current_date.clone().subtract(1, 'month');
    await this.getList();
  }

  @computed
  get currentMonthYear() {
    return this.current_date.format('MMMM YYYY');
  }

  @action
  fillStore(data: LessonProgressMonthStore) {
    const { list } = data;
    this.list = (list || []).map((lessonProgressMonthItem) => new LessonProgressMonthItemStore(lessonProgressMonthItem));
    this.current_date = moment();
  }

}

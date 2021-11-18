import { action, computed, makeObservable, observable } from 'mobx';
import { StatisticsItemI } from '../interfaces';
import { API } from '../core';
import { METHODS_REQUEST } from '../constants';
import { RootStore } from './index';
import { StatisticsLessonsProgressStore } from './statistics-lessons-progress';

let rootStore: RootStore;

export class StatisticsListStore {

  @observable list: StatisticsItemI = {};

  constructor(initialData: StatisticsListStore | null, root: RootStore) {
    makeObservable(this);

    rootStore = root;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async get() {
    try {
      const response = await API.request<StatisticsItemI>(`lesson-progress/list`, {
        method: METHODS_REQUEST.POST,
        body: API.getFormData({
          service_id: rootStore.systemStore.service_id,
          instrument_id: rootStore.systemStore.instrument_id
        })
      });

      Object.keys(response).forEach((course_id) => {
        this.list[course_id] = (response[course_id] || []).map((statisticLessonsProgressStore) => {
          return new StatisticsLessonsProgressStore(statisticLessonsProgressStore, rootStore);
        });
      });

      console.log('this.list', this.list);
    } catch (e) {
      console.error(`Error in method StatisticsLessonProgressStore.get : `, e);
    }
  }

  @computed
  get getCoursesPassedTotal(): { [key: string]: number } {
    let courses: { [key: string]: number } = {};

    Object.keys(this.list).forEach((course_id) => {

      if (!courses[course_id]) {
        courses[course_id] = 0;
      }

      this.list[course_id].forEach((statisticLessonsProgressStore) => {
        statisticLessonsProgressStore.lessons.forEach((lesson) => {
          courses[course_id] += lesson.total_progress_minute;
        });
      });
    });

    return courses;
  }

  @action
  fillingStore(data: StatisticsListStore) {
    const { list } = data;

    Object.keys(list).forEach((course_id) => {
      this.list[course_id] = (list[course_id] || []).map((statisticLessonsProgressStore) => {
        return new StatisticsLessonsProgressStore(statisticLessonsProgressStore, rootStore);
      });
    });

  }

}

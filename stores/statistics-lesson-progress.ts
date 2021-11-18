import { action, makeObservable, observable } from 'mobx';
import { StatisticsLessonProgressI } from '../interfaces';
import { RootStore } from './index';

let rootStore: RootStore;

export class StatisticsLessonProgressStore implements StatisticsLessonProgressI {

  @observable lesson_id = 0;
  @observable uuid = '';
  @observable duration_minute = 0;
  @observable total_progress_minute = 0;

  constructor(initialData: StatisticsLessonProgressStore | null, root: RootStore) {
    makeObservable(this);

    rootStore = root;

    console.log(rootStore);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }


  @action
  fillingStore(data: StatisticsLessonProgressStore) {
    const { lesson_id, uuid, duration_minute, total_progress_minute } = data;

    this.lesson_id = lesson_id;
    this.uuid = uuid;
    this.duration_minute = duration_minute;
    this.total_progress_minute = total_progress_minute;
  }

}

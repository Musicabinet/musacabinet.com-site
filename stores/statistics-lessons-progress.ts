import { action, makeObservable, observable } from 'mobx';
import { StatisticsLessonsProgressI } from '../interfaces';
import { StatisticsLessonProgressStore } from './statistics-lesson-progress';
import { RootStore } from './index';

let rootStore: RootStore;

export class StatisticsLessonsProgressStore implements StatisticsLessonsProgressI {

  @observable course_id = 0;
  @observable module_id = 0;
  @observable collection_id = 0;
  @observable lessons: StatisticsLessonProgressStore[] = [];

  constructor(initialData: StatisticsLessonsProgressStore | null, root: RootStore) {
    makeObservable(this);

    rootStore = root;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: StatisticsLessonsProgressStore) {
    const { course_id, module_id, collection_id, lessons } = data;

    this.course_id = course_id;
    this.module_id = module_id;
    this.collection_id = collection_id;
    this.lessons = (lessons || []).map((lesson) => new StatisticsLessonProgressStore(lesson, rootStore));
  }

}

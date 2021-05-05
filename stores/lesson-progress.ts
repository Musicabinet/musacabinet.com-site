import { action, makeObservable, observable } from 'mobx';
import { LessonStore } from './lesson';

interface ImportStore {
  lessonStore: LessonStore
}

export class LessonProgressStore {

  @observable timer: boolean = false;

  lessonStore: LessonStore;

  constructor(initialData: LessonProgressStore | null, { lessonStore }: ImportStore) {
    makeObservable(this);

    this.lessonStore = lessonStore;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  start() {
    this.timer = true;
  }

  @action.bound
  stop() {
    this.timer = false;
  }

  @action
  fillingStore(data: LessonProgressStore) {
    const {} = data;
  }

}

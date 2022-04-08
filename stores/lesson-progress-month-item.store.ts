import { action, makeObservable, observable } from 'mobx';
import { LessonProgressMonthI } from '../interfaces';
import moment, { Moment } from 'moment';

export class LessonProgressMonthItemStore implements LessonProgressMonthI {

  @observable id = 0;
  @observable user_id = 0;
  @observable datetime: Moment = moment();
  @observable progress_hours = 0;

  constructor(initialData: LessonProgressMonthItemStore | LessonProgressMonthI | null) {
    makeObservable(this);

    if (initialData) {
      this.fillStore(initialData);
    }
  }

  @action
  fillStore(data: LessonProgressMonthItemStore | LessonProgressMonthI) {
    const { id, user_id, datetime, progress_hours } = data;

    this.id = id;
    this.user_id = user_id;
    this.datetime = moment(datetime);
    this.progress_hours = Number(progress_hours);
  }

}

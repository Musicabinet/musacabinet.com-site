import { action, computed, observable } from 'mobx';
import { TrialVersionI } from '../interfaces';
import moment, { Moment } from 'moment';

export class TrialVersionStore implements TrialVersionI {

  @observable id = 0;
  @observable user_id = 0;
  @observable date_start: Moment = moment();
  @observable date_end: Moment = moment();

  constructor(initialData: TrialVersionStore | TrialVersionI | null) {
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @computed
  get isValid(): boolean {
    return (this.totalDayRemain > 0);
  }

  @computed
  get totalDayRemain(): number {
    const currentDate = moment().set({ hours: 0, minutes: 0, second: 0 });
    const result = this.date_end.diff(currentDate, 'days');

    return result > 0 ? result : 0;
  }

  @computed
  get totalDayPassed(): number {
    const currentDate = moment().set({ hours: 0, minutes: 0, second: 0 });
    const format = 'dMY';

    if(currentDate.format(format) === this.date_start.format(format)){
      return 0;
    }

    const result = currentDate.diff(this.date_start, 'days');
    return result > 0 ? result <= this.totalDayRemain ? result : this.totalDays : this.totalDays;
  }

  @computed
  get totalDays(): number {
    return this.date_end.diff(this.date_start, 'days');
  }

  @action
  fillingStore(data: TrialVersionStore | TrialVersionI) {
    const { id, user_id, date_start, date_end } = data;

    this.id = id;
    this.user_id = user_id;
    this.date_start = moment(date_start);
    this.date_end = moment(date_end).add('day', 1);
  }

}

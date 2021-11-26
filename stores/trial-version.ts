import { action, computed, makeObservable, observable } from 'mobx';
import { TrialVersionI } from '../interfaces';
import moment, { Moment } from 'moment';

export class TrialVersionStore implements TrialVersionI {

  @observable user_id = 0;
  @observable date_start: Moment = moment();
  @observable date_end: Moment = moment();
  @observable days_passed = 0;
  @observable days_remain = 0;
  @observable is_valid = false;

  constructor(initialData: TrialVersionStore | TrialVersionI | null) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @computed
  get percentPassed(): string {
    return `${((100 * this.days_passed) / this.totalDays).toFixed(0)}%`;
  }

  @computed
  get percentPassedInteger(): number {
    return parseInt(this.percentPassed);
  }

  @computed
  get isExpired(): boolean {
    return this.percentPassedInteger >= 100;
  }

  @computed
  get totalDays(){
    return this.days_remain + this.days_passed;
  }

  @action
  fillingStore(data: TrialVersionStore | TrialVersionI) {
    const { user_id, date_start, date_end, days_passed, days_remain, is_valid } = data;

    this.user_id = user_id;
    this.date_start = moment(date_start);
    this.date_end = moment(date_end);
    this.days_passed = days_passed;
    this.days_remain = days_remain;
    this.is_valid = is_valid;
  }
}

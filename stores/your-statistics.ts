import { action, makeObservable, observable } from 'mobx';
import moment, { Moment } from 'moment';

export class YourStatisticsStore {

  @observable currentDate: Moment = moment();

  constructor(initialData: YourStatisticsStore | null) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  previousMonth() {
    let date = this.currentDate.clone();
    date.subtract(1, 'month');
    this.currentDate = date;
  }

  @action.bound
  nextMonth() {
    let date = this.currentDate.clone();
    date.add(1, 'month');
    this.currentDate = date;
  }

  @action
  fillingStore(data: YourStatisticsStore) {
    const {} = data;
  }

}

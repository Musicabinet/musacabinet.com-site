import { action, computed, observable } from 'mobx';
import { PurchaseI } from '../interfaces';
import { SERVICE_ID } from '../constants';
import moment from 'moment';

export class PurchaseStore implements PurchaseI {

  @observable id = 0;
  @observable user_id = 0;
  @observable service_id: SERVICE_ID = 0;
  @observable instrument_id = 0;
  @observable date_start = moment();
  @observable date_end = moment();

  constructor(initialData: PurchaseStore | PurchaseI | null) {
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @computed
  get totalDays(): number {
    return this.date_end.diff(this.date_start, 'days');
  }

  @computed
  get totalDayRemain(): number {
    const currentDate = moment().set({ hours: 0, minutes: 0, second: 0 });
    let result = this.date_end.diff(currentDate, 'days');

    if (result > 0 && this.date_start.format('dMY') === moment().format('dMY')) {
      result += 1;
    }

    return result > 0 ? result : 0;
  }

  @computed
  get totalDayPassed(): number {
    const currentDate = moment().set({ hours: 0, minutes: 0, second: 0 });
    const format = 'dMY';

    if (currentDate.format(format) === this.date_start.format(format)) {
      return 0;
    }

    const result = currentDate.diff(this.date_start, 'days');
    return result > 0 ? result <= this.totalDayRemain ? result : this.totalDays : this.totalDays;
  }

  @action
  fillingStore(data: PurchaseStore | PurchaseI) {
    const { id, user_id, service_id, instrument_id, date_start, date_end } = data;

    this.id = id;
    this.user_id = user_id;
    this.service_id = service_id;
    this.instrument_id = instrument_id;
    this.date_start = moment(date_start);
    this.date_end = moment(date_end);
  }

}

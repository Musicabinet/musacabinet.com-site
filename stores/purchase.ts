import { action, computed, makeObservable, observable } from 'mobx';
import { PurchaseI } from '../interfaces';
import { SERVICE_ID } from '../constants';
import moment from 'moment';
import { RootStore } from './index';

export class PurchaseStore implements PurchaseI {

  @observable id = 0;
  @observable user_id = 0;
  @observable service_id: SERVICE_ID = 0;
  @observable instrument_id = 0;
  @observable product_id = 0;
  @observable price = 0;
  @observable date_start = moment();
  @observable date_end = moment();
  @observable days_passed = 0;
  @observable days_remain = 0;

  constructor(initialData: PurchaseStore | PurchaseI | null, _root: RootStore) {
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
  get totalDays(): number {
    return this.days_remain + this.days_passed;
  }


  @action
  fillingStore(data: PurchaseStore | PurchaseI) {
    const {
      id,
      user_id,
      service_id,
      instrument_id,
      date_start,
      date_end,
      days_passed,
      days_remain,
      product_id,
      price
    } = data;

    this.id = id;
    this.user_id = user_id;
    this.service_id = service_id;
    this.instrument_id = instrument_id;
    this.product_id = product_id;
    this.price = price;
    this.date_start = moment(date_start);
    this.date_end = moment(date_end);
    this.days_passed = days_passed;
    this.days_remain = days_remain;
  }
}

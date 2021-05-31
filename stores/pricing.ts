import { action, computed, makeObservable, observable } from 'mobx';
import { PriceI, PriceListI } from '../interfaces';
import { SystemStore } from './system';
import { SERVICE_NAME } from '../constants';

interface ImportStore {
  systemStore: SystemStore,
}

export class PricingStore {

  @observable list: PriceListI = {
    [SERVICE_NAME.SCHOOL]: [{
      name: '1 month',
      old_price: 30,
      price: 14.99
    }, {
      name: '3 months',
      old_price: 70,
      price: 34.99
    }, {
      name: '6 months',
      old_price: 120,
      price: 54.99
    }],
    [SERVICE_NAME.COLLEGE]: [{
      name: '1 month',
      old_price: 99,
      price: 49
    }, {
      name: '3 months',
      old_price: 299,
      price: 119
    }, {
      name: '6 months',
      old_price: 599,
      price: 249
    }]
  };

  @observable service: SERVICE_NAME = SERVICE_NAME.SCHOOL;
  @observable month = 0;

  systemStore: SystemStore;

  constructor(initialData: PricingStore | null, { systemStore }: ImportStore) {
    makeObservable(this);
    this.systemStore = systemStore;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  setMonth(month = 0) {
    this.month = month;
  }

  @computed
  get prices(): PriceI[] {
    return this.list[this.service] || [];
  }

  @computed
  get price() {
    return (this.list[this.service]) ? this.list[this.service][this.month].price : '';
  }

  @computed
  get oldPrice() {
    return (this.list[this.service]) ? this.list[this.service][this.month].old_price : '';
  }

  @action
  fillingStore(data: PricingStore) {
    const {} = data;
  }

}
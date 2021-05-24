import { action, observable } from 'mobx';
import { PriceListI } from '../interfaces';
import { SystemStore } from './system';

interface ImportStore {
  systemStore: SystemStore,
}

export class PricingStore {

  @observable list: PriceListI = {
    'school': [{
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
    'college': [{
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

  systemStore: SystemStore;

  constructor(initialData: PricingStore | null, { systemStore }: ImportStore) {

    this.systemStore = systemStore;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: PricingStore) {
    const {} = data;
  }

}

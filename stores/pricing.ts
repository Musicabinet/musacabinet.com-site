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
      price: 21
    }, {
      name: '3 months',
      old_price: 75,
      price: 55
    }, {
      name: '6 months',
      old_price: 120,
      price: 89
    }],
    [SERVICE_NAME.COLLEGE]: [{
      name: '1 month',
      old_price: 100,
      price: 75
    }, {
      name: '6 months',
      old_price: 480,
      price: 360
    }, {
      name: '12 months',
      old_price: 720,
      price: 540
    }]
  };

  @observable month = 0;
  @observable selected_instrument = 'guitar';

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

  @action.bound
  setInstrument(instrument: string) {
    this.selected_instrument = instrument;
  }

  @action.bound
  async generateButtonPayPal() {
    try {

    } catch (e) {
      console.error(`Error in method generateButtonPayPal : `, e);
    }
  }

  @computed
  get prices(): PriceI[] {
    if (this.systemStore.service_name) {
      return this.list[this.systemStore.service_name] || [];
    } else {
      return this.list[SERVICE_NAME.SCHOOL] || [];
    }
  }

  @computed
  get price() {
    return (this.prices && this.prices.length > 0) ? this.prices[this.month].price : '';
  }

  @computed
  get oldPrice() {
    return (this.prices && this.prices.length > 0) ? this.prices[this.month].old_price : '';
  }

  @action
  fillingStore(data: PricingStore) {
    const {} = data;
  }

}

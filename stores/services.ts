import { action, makeObservable, observable } from 'mobx';
import { ServiceI } from '../interfaces';
import { API } from '../core';
import { ServiceStore } from './service';

export class ServicesStore {

  @observable list: ServiceI[] = [];

  constructor(initialData: ServicesStore | null) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async getList() {
    try {
      const response = await API.request<ServiceI[]>(`services/list-subscriptions`);
      this.list = response.map((service) => new ServiceStore(service));
    } catch (e) {
      console.error(`Error in method ServicesStore.getList  :`, e);
    }
  }

  @action
  fillingStore(data: ServicesStore) {
    const { list } = data;

    this.list = list;
  }

}

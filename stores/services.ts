import { action, makeObservable, observable } from 'mobx';
import { ServiceI } from '../interfaces';
import { API } from '../core';
import { ServiceStore } from './service';
import { ServiceListResponse } from '../responsible';

export class ServicesStore {

  @observable list: ServiceI[] = [];
  @observable all: ServiceI[] = [];

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

  @action.bound
  async getAll() {
    try {
      const {data} = await API.request<ServiceListResponse>(`services/list`);
      this.all = data.map((service) => new ServiceStore(service));
    } catch (e) {
      console.error(`Error in method getAll: `, e);
    }
  }

  @action
  fillingStore(data: ServicesStore) {
    const { list, all } = data;

    this.list = list;
    this.all = all;
  }

}

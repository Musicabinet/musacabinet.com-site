import { action, computed, makeObservable, observable } from 'mobx';
import { ServiceI } from '../interfaces';
import { API } from '../core';
import { ServiceStore } from './service';
import { ServiceListResponse } from '../responsible';
import { RootStore } from './index';

let rootStore: RootStore;

export class ServicesStore {
  @observable list: ServiceStore[] = [];
  @observable all: ServiceStore[] = [];

  constructor(initialData: ServicesStore | null, root: RootStore) {
    makeObservable(this);
    rootStore = root;

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
      const { data } = await API.request<ServiceListResponse>(`services/list`);
      this.all = data.map((service) => new ServiceStore(service));
    } catch (e) {
      console.error(`Error in method getAll: `, e);
    }
  }

  @computed
  get instruments() {
    const find = this.list.find((service) => service.slug === rootStore.systemStore.service_name);
    return find ? find.instruments : [];
  }

  @action
  fillingStore(data: ServicesStore) {
    const { list, all } = data;

    this.list = (list || []).map((service)=>new ServiceStore(service));
    this.all = (all || []).map((service)=>new ServiceStore(service));
  }
}

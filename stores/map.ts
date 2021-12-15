import { action, makeObservable, observable } from 'mobx';
import { MapI } from '../interfaces';
import { RootStore } from './index';
import { API } from '../core';
import { METHODS_REQUEST } from '../constants';

let rootStore: RootStore;

export class MapStore {

  @observable list: MapI = {};

  constructor(initialData: MapStore | null, root: RootStore) {
    makeObservable(this);

    rootStore = root;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async getList() {
    try {
      this.list = await API.request<MapI>(`map/get`, {
        method: METHODS_REQUEST.POST,
        body: API.getFormData({
          service_id: rootStore.systemStore.service_id,
          instrument_id: rootStore.systemStore.instrument_id
        })
      });
    } catch (e) {
      console.error(`Error in method MapStore.getList : `, e);
    }
  }

  @action
  fillingStore(data: MapStore) {
    const { list } = data;
    this.list = list;
  }

}

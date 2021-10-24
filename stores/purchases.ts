import { action, observable } from 'mobx';
import { PurchaseStore } from './purchase';
import { API } from '../core';
import { METHODS_REQUEST } from '../constants';

export class PurchasesStore {
  @observable list: PurchaseStore[] = [];

  constructor(initialData: PurchasesStore | null) {
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async create(data: any) {
    try {
      await API.request(`purchase`, {
        method: METHODS_REQUEST.POST,
        body: API.getFormData(data)
      });
    } catch (e) {
      console.error(`Error in method PurchasesStore.create`);
    }
  }

  @action
  fillingStore(data: PurchasesStore) {
    const { list } = data;

    this.list = (list || []).map((purchase) => new PurchaseStore(purchase));
  }
}

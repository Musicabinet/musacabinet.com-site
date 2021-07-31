import { action, observable } from 'mobx';
import { PurchaseStore } from './purchase';

export class PurchasesStore {

  @observable list: PurchaseStore[] = [];

  constructor(initialData: PurchasesStore | null) {

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: PurchasesStore) {
    const { list } = data;

    this.list = (list || []).map((purchase) => new PurchaseStore(purchase));
  }

}

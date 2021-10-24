import { action, observable } from 'mobx';
import { ProductInstrumentI } from '../interfaces';

export class ProductInstrumentStore implements ProductInstrumentI {

  @observable id = 0;
  @observable slug = '';

  constructor(initialData: ProductInstrumentStore | ProductInstrumentI | null) {
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: ProductInstrumentStore | ProductInstrumentI) {
    const { id, slug } = data;

    this.id = id;
    this.slug = slug;
  }

}

import { action, makeObservable, observable } from 'mobx';
import { ProductItemI } from '../interfaces';

export class ProductItemStore implements ProductItemI{

  @observable id = 0;
  @observable name = '';

  constructor(initialData: ProductItemStore | ProductItemI | null) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData)
    }
  }

  @action
  fillingStore(data: ProductItemStore | ProductItemI) {
    const {id, name} = data;

    this.id = id;
    this.name = name;
  }

}

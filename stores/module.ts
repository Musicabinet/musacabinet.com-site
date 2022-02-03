import { action, computed, observable } from 'mobx';
import { ModuleI } from '../interfaces';

export class ModuleStore implements ModuleI {

  @observable id = 0;
  @observable sort = 0;
  @observable name = '';
  @observable is_active = false;

  constructor(initialData: ModuleStore | ModuleI | null) {
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @computed
  get nameWithoutNumber(): string {
    return this.name.replace(/[0-9]./g, '').toUpperCase();
  }

  @computed
  get nameModule(): string {
    return `Module ${this.name.replace( /\D+/g, '')}`;
  }

  @action
  fillingStore(data: ModuleStore | ModuleI) {
    const { id, sort, name, is_active } = data;

    this.id = id;
    this.sort = sort;
    this.name = name;
    this.is_active = is_active;
  }

}

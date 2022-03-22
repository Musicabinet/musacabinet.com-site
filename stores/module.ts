import { action, computed, observable } from 'mobx';
import { ModuleI } from '../interfaces';

export class ModuleStore implements ModuleI {

  @observable id = 0;
  @observable sort = 0;
  @observable name = '';
  @observable number_module = 1;
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
    const { id, sort, name, number_module, is_active } = data;

    this.id = id;
    this.sort = sort;
    this.name = name;
    this.number_module = number_module;
    this.is_active = is_active;
  }

}

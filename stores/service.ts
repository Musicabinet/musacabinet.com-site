import { action, makeObservable, observable } from 'mobx';
import { ServiceI } from '../interfaces';
import { InstrumentStore } from './instrument';

export class ServiceStore implements ServiceI {
  @observable id = 0;
  @observable name = '';
  @observable slug = '';
  @observable is_active = false;
  @observable instruments: InstrumentStore[] = [];

  constructor(initialData: ServiceStore | null | ServiceI) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: ServiceStore | ServiceI) {
    const { id, name, slug, is_active, instruments } = data;

    this.id = id;
    this.name = name;
    this.slug = slug;
    this.is_active = is_active;
    this.instruments = (instruments || []).map((instrument) => new InstrumentStore(instrument));
  }
}

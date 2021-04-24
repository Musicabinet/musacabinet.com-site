import { action, makeObservable, observable } from 'mobx';
import { InstrumentI } from '../interfaces';

export class InstrumentStore implements InstrumentI {

  @observable id = 0;
  @observable service_id = 0;
  @observable sort = 0;
  @observable slug = '';
  @observable meta_title = '';
  @observable meta_description = '';
  @observable meta_keywords = '';
  @observable name = '';
  @observable description = '';
  @observable icon = '';
  @observable is_active = false;

  constructor(initialData: InstrumentStore | null | InstrumentI) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: InstrumentStore | InstrumentI) {
    const {
      id,
      service_id,
      sort,
      slug,
      meta_title,
      meta_description,
      meta_keywords,
      name,
      description,
      icon,
      is_active
    } = data;

    this.id = id;
    this.service_id = service_id;
    this.sort = sort;
    this.slug = slug;
    this.meta_title = meta_title;
    this.meta_description = meta_description;
    this.meta_keywords = meta_keywords;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.is_active = is_active;
  }

}

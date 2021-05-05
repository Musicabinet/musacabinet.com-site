import { action, computed, makeObservable, observable } from 'mobx';
import { CollectionI, RelationIdNameI } from '../interfaces';
import { SERVICE_NAME } from '../constants';

export class CollectionStore implements CollectionI {

  pathStore = 'admin/collections';
  redirect = 'collections';

  @observable isFetch: boolean = false;

  @observable id = 0;
  @observable sort = 1;
  @observable service_id = 0;
  @observable instrument_id: undefined | number = undefined;
  @observable course_id: undefined | number = undefined;
  @observable module_id: undefined | number = undefined;
  @observable is_active = true;
  @observable instruments: RelationIdNameI | null = null;
  @observable courses: RelationIdNameI | null = null;
  @observable modules: RelationIdNameI | null = null;

  constructor(initialData: CollectionI | null) {
    makeObservable(this);
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @computed
  get serviceName(): SERVICE_NAME | null {
    let result: SERVICE_NAME | null = null;

    switch (this.service_id) {
      case 1: {
        result = SERVICE_NAME.SCHOOL;
        break;
      }
      case 2: {
        result = SERVICE_NAME.COLLEGE;
        break;
      }
      case 3: {
        result = SERVICE_NAME.UNIVERSITY;
        break;
      }
    }

    return result;
  }

  @computed
  get instrumentName():string {
    return (this.instruments && this.instruments.name) ? this.instruments.name : '';
  }

  @computed
  get instrumentIcon():string {
    return (this.instruments && this.instruments.name) ? this.instruments.name.toUpperCase() : '';
  }

  @computed
  get courseName(): string {
    return (this.courses && this.courses.name) ? this.courses.name : '';
  }

  @computed
  get moduleName(): string {
    return (this.modules && this.modules.name) ? this.modules.name : '';
  }

  @action
  fillingStore(data: CollectionI) {
    const {
      id,
      sort,
      service_id,
      instrument_id,
      course_id,
      module_id,
      is_active,
      instruments,
      courses,
      modules
    } = data;

    this.id = id;
    this.sort = sort;
    this.service_id = service_id;
    this.instrument_id = instrument_id;
    this.course_id = course_id;
    this.module_id = module_id;
    this.is_active = is_active;
    this.instruments = (instruments) ? instruments : null;
    this.courses = (courses) ? courses : null;
    this.modules = (modules) ? modules : null;

  }

}

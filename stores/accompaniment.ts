import { action, makeObservable, observable } from 'mobx';
import { AccompanimentI, LibraryI } from '../interfaces';

export class AccompanimentStore implements AccompanimentI {

  @observable id = 0;
  @observable lesson_id = 0;
  @observable sort = 1;
  @observable name = '';
  @observable libraries: LibraryI[] = [];

  constructor(initialData: AccompanimentI | null) {
    makeObservable(this);
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: AccompanimentI) {
    const { id, lesson_id, sort, name, libraries } = data;

    this.id = id;
    this.lesson_id = lesson_id;
    this.sort = sort;
    this.name = name;
    this.libraries = (libraries || []).map((library) => library);
  }

}

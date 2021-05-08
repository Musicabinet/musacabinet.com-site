import { action, observable } from 'mobx';

export class MetronomeStore {

  @observable current: number = 120;

  constructor(initialData: MetronomeStore | null) {
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: MetronomeStore) {
    const {} = data;
  }

}

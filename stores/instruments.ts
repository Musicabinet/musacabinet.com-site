import { action, observable } from 'mobx';
import { InstrumentI } from '../interfaces';
import { API } from '../core';
import { InstrumentStore } from './instrument';

export class InstrumentsStore {

  @observable all: InstrumentI[] = [];

  constructor(initialData: InstrumentsStore | null) {
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async getAll() {
    try {
      const result = await API.request<InstrumentI[]>(`instrument/all?service_id=1`);
      this.all = result.map((instrument) => new InstrumentStore(instrument));
    } catch (e) {
      console.error(`Error in method InstrumentsStore.getAll : `, e);
    }
  }

  @action
  fillingStore(data: InstrumentsStore) {
    const {} = data;
  }

}

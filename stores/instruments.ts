import { action, computed, observable } from 'mobx';
import { InstrumentGroup, InstrumentI } from '../interfaces';
import { API } from '../core';
import { InstrumentStore } from './instrument';
import { SERVICE_ID } from '../constants';

export class InstrumentsStore {
  @observable all: InstrumentStore[] = [];

  constructor(initialData: InstrumentsStore | null) {
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async getAll(service_id: SERVICE_ID | null = null) {
    try {
      let queryString = `instrument/all`;

      if (service_id) {
        queryString += `?service_id=${service_id}`;
      }

      const result = await API.request<InstrumentI[]>(`${queryString}`);
      this.all = result.map((instrument) => new InstrumentStore(instrument));
    } catch (e) {
      console.error(`Error in method InstrumentsStore.getAll : `, e);
    }
  }

  @computed
  get statistics(): InstrumentStore[] {
    return this.all.filter((instrument) => instrument.is_active);
  }

  @computed
  get groupByInstrument(): InstrumentGroup {
    return this.all.reduce((reduce, instrument) => {
      reduce[instrument.slug] = reduce[instrument.slug] || [];
      reduce[instrument.slug].push(instrument);
      return reduce;
    }, Object.create(null));
  }

  @action
  fillingStore(data: InstrumentsStore) {
    const { all } = data;
    this.all = (all || []).map((instrument) => new InstrumentStore(instrument));
  }
}

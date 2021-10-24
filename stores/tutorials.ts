import { action, computed, makeObservable, observable } from 'mobx';
import { TutorialStore } from './tutorial';
import { API } from '../core';
import { TutorialI } from '../interfaces';

export class TutorialsStore {

  static PATH = 'tutorials';

  @observable list: TutorialStore[] = [];
  @observable selected_id: number = 0;

  constructor(initialData: TutorialsStore | null) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async getList() {
    try {
      const response = await API.request<TutorialI[]>(`${TutorialsStore.PATH}`);
      this.list = response.map((tutorial) => new TutorialStore(tutorial));
    } catch (e) {
      console.error(`Error in method :TutorialStore.getList : `, e);
    }
  }

  @action.bound
  setSelectedId(id: number) {
    this.selected_id = id;
  }

  @computed
  get read(): TutorialStore {
    if (this.selected_id === 0) {

      if (this.list.length > 0) {
        this.selected_id = this.list[0].id;
        return this.list[0];
      }

      return new TutorialStore(null);
    }

    const findIndexTutorial = this.list.findIndex((tutorial) => tutorial.id === this.selected_id);
    return (findIndexTutorial !== -1) ? this.list[findIndexTutorial] : new TutorialStore(null);
  }

  @action
  fillingStore(data: TutorialsStore) {
    const { list } = data;
    this.list = list.map((tutorial) => new TutorialStore(tutorial));
  }

}

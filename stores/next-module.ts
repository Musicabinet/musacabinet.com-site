import { action, computed, observable } from 'mobx';
import { SystemStore } from './system';

interface ImportStore {
  systemStore: SystemStore,
}

export class NextModuleStore {

  @observable isShow: boolean = false;
  @observable second: number = 0;

  clearIntervalID: number = 0;
  systemStore: SystemStore;

  constructor(initialData: NextModuleStore | null, { systemStore }: ImportStore) {
    this.systemStore = systemStore;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  start() {
    this.clearIntervalID = window.setInterval(() => {
      this.second = this.second - 1;
    }, 1000);
  }

  @action.bound
  stop() {
    window.clearInterval(this.clearIntervalID);
  }

  @action.bound
  setShow(value: boolean) {
    if (value) {
      this.start();
    } else {
      this.stop();
    }
  }

  @action.bound
  setSecond() {
    this.second = this.systemStore.secondNextModule;
  }

  @computed
  get percent(): number {
    const current = this.systemStore.secondNextModule - this.second;
    return (current * 100) / 300;
  };

  @action
  fillingStore(data: NextModuleStore) {
    const {} = data;
  }

}

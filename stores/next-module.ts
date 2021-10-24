import { action, computed, observable } from 'mobx';
import { RootStore } from './index';

let rootStore: RootStore;

export class NextModuleStore {
  @observable isShow: boolean = false;
  @observable second: number = 0;

  clearIntervalID: number = 0;

  constructor(initialData: NextModuleStore | null, root: RootStore) {
    rootStore = root;

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
    this.second = rootStore.systemStore.secondNextModule;
  }

  @computed
  get percent(): number {
    const current = rootStore.systemStore.secondNextModule - this.second;
    return (current * 100) / 300;
  }

  @action
  fillingStore(data: NextModuleStore) {
    const {} = data;
  }
}

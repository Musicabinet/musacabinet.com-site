import { action, computed, makeObservable, observable } from 'mobx';
import { RootStore } from './index';
import { SERVICE_NAME } from '../constants';

let rootStore: RootStore;

export class NextModuleStore {
  @observable isShow: boolean = false;
  @observable second: number = 0;

  clearIntervalID: number = 0;

  constructor(initialData: NextModuleStore | null, root: RootStore) {
    makeObservable(this);

    rootStore = root;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  start() {

    if (this.isShow) {
      return false;
    }

    this.second = this.totalSeconds;
    this.isShow = true;
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

  @action.bound
  close() {
    this.isShow = false;
    this.stop();
  }

  @computed
  get percent(): number {
    const current = rootStore.systemStore.secondNextModule - this.second;
    return (current * 100) / this.totalSeconds;
  }

  @computed
  get totalSeconds(): number {
    switch (rootStore.systemStore.service_name) {
      case SERVICE_NAME.SCHOOL:
        return 300;
      case SERVICE_NAME.COLLEGE:
        return 600;
      case SERVICE_NAME.UNIVERSITY:
        return 900;
    }
  }

  @action
  fillingStore(data: NextModuleStore) {
    const {} = data;
  }
}

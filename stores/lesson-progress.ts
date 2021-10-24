import { action, makeObservable, observable } from 'mobx';
import { RootStore } from './index';

let rootStore: RootStore;

export class LessonProgressStore {
  @observable timer: boolean = true;

  constructor(initialData: LessonProgressStore | null, root: RootStore) {
    makeObservable(this);
    rootStore = root;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async init() {
    console.log(1);
    if (this.timer && rootStore.websocketStore.connect) {
      console.log(2);
      rootStore.websocketStore.callbackOnMessage(() => {
        rootStore.lessonStore.incrementProgress();
      });
    }
  }

  @action.bound
  async start() {
    if (!rootStore.websocketStore.connect) {
      await rootStore.websocketStore.init();
      rootStore.websocketStore.sendMessage({
        uuid: rootStore.lessonStore.uuid
      });
    }

    rootStore.websocketStore.callbackOnMessage(() => {
      rootStore.lessonStore.incrementProgress();
    });

    this.timer = true;
  }

  @action.bound
  async stop() {
    await rootStore.websocketStore.disconnect();
    this.timer = false;
  }

  @action
  fillingStore(data: LessonProgressStore) {
    const {} = data;
  }
}

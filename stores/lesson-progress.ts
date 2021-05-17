import { action, makeObservable, observable } from 'mobx';
import { LessonStore } from './lesson';
import { WebsocketStore } from './websocket';

interface ImportStore {
  lessonStore: LessonStore,
  websocketStore: WebsocketStore
}

export class LessonProgressStore {

  @observable timer: boolean = true;

  lessonStore: LessonStore;
  websocketStore: WebsocketStore;

  constructor(initialData: LessonProgressStore | null, { lessonStore, websocketStore }: ImportStore) {
    makeObservable(this);

    this.lessonStore = lessonStore;
    this.websocketStore = websocketStore;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async init(){
    console.log(1);
    if(this.timer && this.websocketStore.connect){
      console.log(2);
      this.websocketStore.callbackOnMessage(() => {
        this.lessonStore.incrementProgress();
      });
    }
  }

  @action.bound
  async start() {

    if(!this.websocketStore.connect){
      await this.websocketStore.init();
      this.websocketStore.sendMessage({
        uuid: this.lessonStore.uuid
      });
    }

    this.websocketStore.callbackOnMessage(() => {
      this.lessonStore.incrementProgress();
    });

    this.timer = true;
  }

  @action.bound
  async stop() {
    await this.websocketStore.disconnect();
    this.timer = false;
  }

  @action
  fillingStore(data: LessonProgressStore) {
    const {} = data;
  }

}

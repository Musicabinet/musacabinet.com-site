import { configure } from "mobx"
import { enableStaticRendering } from 'mobx-react';
import { MenuListStore } from './menu-list';
import { ModalsStore } from './modals';
import { AuthStore } from './auth';
import { NotificationsStore } from './notifications';
import { UserStore } from './user';
import { ServicesStore } from './services';
import { GrandChartStore } from './grand-chart';
import { SystemStore } from './system';
import { LessonStore } from './lesson';
import { PlayerStore } from './player';
import { LessonProgressStore } from './lesson-progress';
import { InstrumentsStore } from './instruments';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

configure({
  enforceActions: "never",
})

export class RootStore {

  public systemStore: SystemStore;
  public userStore: UserStore;
  public menuListStore: MenuListStore;
  public modalsStore: ModalsStore;
  public authStore: AuthStore;
  public notificationsStore: NotificationsStore;
  public servicesStore: ServicesStore;
  public grandChartStore: GrandChartStore;
  public lessonStore: LessonStore;
  public playerStore: PlayerStore;
  public lessonProgress: LessonProgressStore;
  public instrumentsStore: InstrumentsStore;


  constructor(initialData: RootStore | null) {

    this.systemStore = new SystemStore(
      initialData && initialData.systemStore ? initialData.systemStore : null
    );

    this.servicesStore = new ServicesStore(
      initialData && initialData.servicesStore ? initialData.servicesStore : null
    );

    this.userStore = new UserStore(
      initialData && initialData.userStore ? initialData.userStore : null
    );

    this.notificationsStore = new NotificationsStore(
      initialData && initialData.notificationsStore ? initialData.notificationsStore : null
    );

    this.menuListStore = new MenuListStore(
      initialData && initialData.menuListStore ? initialData.menuListStore : null
    );

    this.modalsStore = new ModalsStore();

    this.authStore = new AuthStore(
      initialData && initialData.authStore ? initialData.authStore : null, {
        notificationsStore: this.notificationsStore,
        userStore: this.userStore
      }
    );

    this.grandChartStore = new GrandChartStore(
      initialData && initialData.grandChartStore ? initialData.grandChartStore : null,
      { systemStore: this.systemStore }
    );

    this.lessonStore = new LessonStore(
      initialData && initialData.lessonStore ? initialData.lessonStore : null,
      { systemStore: this.systemStore }
    );

    this.playerStore = new PlayerStore(
      initialData && initialData.playerStore ? initialData.playerStore : null,
      {
        systemStore: this.systemStore,
        lessonStore: this.lessonStore
      }
    );


    this.lessonProgress = new LessonProgressStore(
      initialData && initialData.lessonProgress ? initialData.lessonProgress : null,
      {
        lessonStore: this.lessonStore
      }
    );

    this.instrumentsStore = new InstrumentsStore(
      initialData && initialData.instrumentsStore ? initialData.instrumentsStore : null,
    )

  }
}

let store: any = null;

export default function initializeStore(initialData: null | RootStore = null) {
  if (isServer) {
    return new RootStore(initialData);
  }
  if (store === null) {
    store = new RootStore(initialData);
  }
  return store;
}

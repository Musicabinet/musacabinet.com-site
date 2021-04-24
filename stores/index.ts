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

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

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

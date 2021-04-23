import { enableStaticRendering } from 'mobx-react';
import { MenuListStore } from './menu-list';
import { ModalsStore } from './modals';
import { AuthStore } from './auth';
import { NotificationsStore } from './notifications';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

export class RootStore {

  public menuListStore: MenuListStore;
  public modalsStore: ModalsStore;
  public authStore: AuthStore;
  public notificationsStore: NotificationsStore;

  constructor(initialData: RootStore | null) {


    this.notificationsStore = new NotificationsStore(
      initialData && initialData.notificationsStore ? initialData.notificationsStore : null
    );

    this.menuListStore = new MenuListStore(
      initialData && initialData.menuListStore ? initialData.menuListStore : null
    );

    this.modalsStore = new ModalsStore();

    this.authStore = new AuthStore(
      initialData && initialData.authStore ? initialData.authStore : null,  {
        notificationsStore: this.notificationsStore
      }
    );

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

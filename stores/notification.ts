import { action, makeObservable, observable } from 'mobx';
import { NotificationI } from '../interfaces';
import { NOTIFICATION_TYPE } from '../constants';
import { NotificationsStore } from './notifications';

export class NotificationStore implements NotificationI {

  @observable id = '';
  @observable title = '';
  @observable message = '';
  @observable type: NOTIFICATION_TYPE = NOTIFICATION_TYPE.SUCCESS;

  public notificationsStore: NotificationsStore;

  constructor(initialData: NotificationI | null, { notificationsStore }: { notificationsStore: NotificationsStore }) {
    makeObservable(this);

    this.notificationsStore = notificationsStore;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  remove() {
    this.notificationsStore.list = this.notificationsStore.list.filter((notification) => notification.id !== this.id);
  }

  @action
  fillingStore(data: NotificationI) {
    const { id, title, message, type } = data;

    this.id = id;
    this.title = title;
    this.message = message;
    this.type = type;
  }

}

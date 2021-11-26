import { action, makeObservable, observable } from 'mobx';
import { NotificationStore } from './notification';
import { NotificationI } from '../interfaces';

export class NotificationsStore {
  @observable list: NotificationStore[] = [];

  constructor(initialData: NotificationsStore | null) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  generateID(): string {
    return `notification_${Math.random().toString(36).substring(7)}`;
  }

  @action.bound
  add(notification: NotificationI) {
    let list = [...this.list];
    list.push(new NotificationStore(notification, { notificationsStore: this }));
    this.list = [...list];
  }

  @action.bound
  remove(id: string) {
    this.list = this.list.filter((notification) => notification.id !== id);
  }

  @action
  fillingStore(data: NotificationsStore) {
    const { list } = data;
    this.list = (list || []).map((notification) => new NotificationStore(notification, { notificationsStore: this }));
  }
}

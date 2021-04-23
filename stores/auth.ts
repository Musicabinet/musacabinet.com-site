import { action, makeObservable, observable } from 'mobx';
import { AuthI } from '../interfaces';
import { FacebookClientResponsive, LoginFacebookResponse } from '../responsible';
import { API } from '../core';
import { NotificationsStore } from './notifications';
import { NOTIFICATION_TYPE } from '../constants';

export class AuthStore implements AuthI {

  @observable isAuth = false;
  @observable isFetch = false;
  @observable isFetchFacebook = false;
  @observable isFetchGoogle = false;

  notificationsStore: NotificationsStore;

  constructor(initialData: AuthStore | null, { notificationsStore }: { notificationsStore: NotificationsStore }) {
    makeObservable(this);

    this.notificationsStore = notificationsStore;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async login() {
    try {

    } catch (e) {
      console.error(`Error in method AuthStore.login : `, e);
    }
  }

  @action.bound
  async loginFacebook(data: FacebookClientResponsive) {

    this.isFetchFacebook = true;

    try {
      const response = await API.request<LoginFacebookResponse>(`auth/sign-in-facebook`, {
        method: 'POST',
        body: API.getFormData(data)
      });

      // Если пользователь новый
      if (response.isNew) {
        this.notificationsStore.add({
          id: this.notificationsStore.generateID(),
          title: 'Congratulations!',
          message: 'You are registered',
          type: NOTIFICATION_TYPE.SUCCESS
        });
      } else {
        this.notificationsStore.add({
          id: this.notificationsStore.generateID(),
          title: 'Congratulations!',
          message: 'You are logged in',
          type: NOTIFICATION_TYPE.SUCCESS
        });
      }

    } catch (e) {
      console.error(`Error in method AuthStore.loginFacebook : `, e);
    } finally {
      this.isFetchFacebook = false;
    }
  }

  @action
  fillingStore(data: AuthStore) {
    const {} = data;
  }

}

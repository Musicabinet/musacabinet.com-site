import { action, makeObservable, observable } from 'mobx';
import { AuthI, LoginRequestI, UserI } from '../interfaces';
import { FacebookClientResponsive, LoginResponse } from '../responsible';
import { API, Cookie } from '../core';
import { NotificationsStore } from './notifications';
import { METHODS_REQUEST, NOTIFICATION_TYPE } from '../constants';
import { UserStore } from './user';
import Router from 'next/router';

export class AuthStore implements AuthI {

  @observable isAuth = false;
  @observable isFetch = false;
  @observable isFetchFacebook = false;
  @observable isFetchGoogle = false;

  notificationsStore: NotificationsStore;
  userStore: UserStore;

  constructor(initialData: AuthStore | null, { notificationsStore, userStore }: {
    notificationsStore: NotificationsStore,
    userStore: UserStore
  }) {

    makeObservable(this);

    this.notificationsStore = notificationsStore;
    this.userStore = userStore;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async check(
    callbackError: () => void = async () => ({}),
    callbackSuccess: () => void = async () => ({})
  ) {
    try {
      const { user } = await API.request<LoginResponse>(`auth/check`);
      // Заполняем
      this.userStore.fillingStore(user);
      await callbackSuccess();
      this.setIsAuth();
    } catch (e) {
      await callbackError();
      this.setIsAuth(false);
      console.error(`Redirect : ${callbackError.toString()}`);
    } finally {

    }
  }

  @action.bound
  setIsAuth(value: boolean = true) {
    this.isAuth = value;
  }

  @action.bound
  fillingAfterSign(user: UserI, access_token: string = '') {
    // Пользователь авторизован
    this.setIsAuth();

    // Заполняем данные
    this.userStore.fillingStore(user);

    const cookie = Cookie.getInstance();

    // Записываем токен
    access_token.length > 0 && cookie.set('token', access_token);

    // Успешно авторизован
    this.notificationsStore.add({
      id: this.notificationsStore.generateID(),
      type: NOTIFICATION_TYPE.SUCCESS,
      title: 'Congratulations',
      message: 'You are logged in'
    });

    // Переадресация
    Router.push('/cabinet');
  }

  @action.bound
  async login(data: LoginRequestI) {
    try {

      const { access_token, user } = await API.request<LoginResponse>(`auth/sign-in`, {
        method: METHODS_REQUEST.POST,
        body: API.getFormData(data)
      });

      // Заполнякем сторы
      this.fillingAfterSign(user, access_token);

    } catch (e) {

      this.notificationsStore.add({
        id: this.notificationsStore.generateID(),
        type: NOTIFICATION_TYPE.ERROR,
        title: 'Error',
        message: e.errors.join('<br/>')
      });

      console.error(`Error in method AuthStore.login : `, e);
    }
  }

  @action.bound
  async loginFacebook(data: FacebookClientResponsive) {

    this.isFetchFacebook = true;

    try {
      const response = await API.request<LoginResponse>(`auth/sign-in-facebook`, {
        method: METHODS_REQUEST.POST,
        body: API.getFormData(data)
      });

      // Заполнякем сторы
      this.fillingAfterSign(response.user, response.access_token);

    } catch (e) {
      console.error(`Error in method AuthStore.loginFacebook : `, e);
    } finally {
      this.isFetchFacebook = false;
    }
  }

  @action
  logout = async () => {
    try {
      // Отправка запроса на выход
      await API.request('auth/logout', {
        method: 'POST'
      });
      // Удаляем токен
      const cookie = Cookie.getInstance();
      cookie.remove('token');
      // Разавторизовываем
      this.setIsAuth(false);
      // Переадресация на главную
      await Router.push('/');

    } catch (errResponse) {
      console.log(errResponse);
    }
  };

  @action
  fillingStore(data: AuthStore) {
    const { isAuth } = data;

    this.isAuth = isAuth;
  }

}

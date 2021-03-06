import { action, makeObservable, observable } from 'mobx';
import { AuthI, LoginRequestI, SignUpRequestI, UserI } from '../interfaces';
import { CheckLoginResponse, FacebookClientResponsive, LoginResponse } from '../responsible';
import { API, Cookie } from '../core';
import { METHODS_REQUEST, NOTIFICATION_TYPE } from '../constants';
import Router from 'next/router';
import { RootStore } from './index';

let rootStore: RootStore;

export class AuthStore implements AuthI {
  @observable isAuth = false;
  @observable isFetch = false;
  @observable isFetchFacebook = false;
  @observable isFetchGoogle = false;

  constructor(initialData: AuthStore | null, root: RootStore) {
    makeObservable(this);

    rootStore = root;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async checkLogin(email: string) {
    try {
      const response = await API.request<CheckLoginResponse>(`auth/check-login`, {
        method: METHODS_REQUEST.POST,
        body: API.getFormData({
          email
        })
      });

      if(response.isExist){
        rootStore.notificationsStore.add({
          id: rootStore.notificationsStore.generateID(),
          type: NOTIFICATION_TYPE.ERROR,
          title: 'Error',
          message: 'Login already exists in the system'
        });
      }
    } catch (e) {
      console.error(`Error in method AuthStore.checkLogin : `, e);
    }
  }

  @action.bound
  async check(callbackError: () => void = async () => ({}), callbackSuccess: () => void = async () => ({})) {
    try {
      const response = await API.request<UserI>(`auth/check`);
      // Заполняем
      rootStore.userStore.fillingStore(response);
      await callbackSuccess();
      this.setIsAuth();
    } catch (e) {
      await callbackError();
      this.setIsAuth(false);
      console.error(`Redirect : `, e);
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
    rootStore.userStore.fillingStore(user);
    // Инстанс куки
    const cookie = Cookie.getInstance();
    // Записываем токен
    access_token.length > 0 && cookie.set('token', access_token);

    // Успешно авторизован
    rootStore.notificationsStore.add({
      id: rootStore.notificationsStore.generateID(),
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

      // @ts-ignore
      window.gtag('event', 'sign_in');

      // Заполнякем сторы
      this.fillingAfterSign(user, access_token);
    } catch (e) {
      rootStore.notificationsStore.add({
        id: rootStore.notificationsStore.generateID(),
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

      // @ts-ignore
      window.gtag('event', 'sign_in');

      // Заполнякем сторы
      this.fillingAfterSign(response.user, response.access_token);
    } catch (e) {
      console.error(`Error in method AuthStore.loginFacebook : `, e);
    } finally {
      this.isFetchFacebook = false;
    }
  }

  @action.bound
  async signInGoogle(data: any) {
    try {
      const response = await API.request<LoginResponse>(`auth/sign-in-google`, {
        method: 'POST',
        body: API.getFormData(data)
      });

      if (response.isNew) {
        // @ts-ignore
        window.gtag('event', 'sign_up');
      } else {
        // @ts-ignore
        window.gtag('event', 'sign_in');
      }

      // Заполнякем сторы
      this.fillingAfterSign(response.user, response.access_token);
    } catch (e) {
      console.log(`Error method in signInGoogle: `, e);
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

  @action.bound
  async signUp(data: SignUpRequestI) {
    try {
      const response = await API.request<LoginResponse>(`auth/sign-up`, {
        method: METHODS_REQUEST.POST,
        body: API.getFormData(data)
      });

      // @ts-ignore
      window.gtag('event', 'sign_up');


      // Заполнякем сторы
      this.fillingAfterSign(response.user, response.access_token);
    } catch (e) {
      rootStore.notificationsStore.add({
        id: rootStore.notificationsStore.generateID(),
        type: NOTIFICATION_TYPE.ERROR,
        title: 'Error',
        message: e.errors.join('<br/>')
      });

      console.error(`Error in method signUp : `, e);
    }
  }

  @action
  fillingStore(data: AuthStore) {
    const { isAuth } = data;
    this.isAuth = isAuth;
  }
}

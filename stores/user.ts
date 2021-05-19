import { action, computed, makeObservable, observable } from 'mobx';
import { UserI } from '../interfaces';
import { NotificationsStore } from './notifications';
import { METHODS_REQUEST, NOTIFICATION_TYPE } from '../constants';
import { API } from '../core';
import { UploadAvatarResponse } from '../responsible';

interface ImportStore {
  notificationsStore: NotificationsStore
}

export class UserStore implements UserI {

  @observable id = 0;
  @observable first_name = '';
  @observable last_name = '';
  @observable avatar = '';
  @observable birthday: Date | undefined = undefined;
  @observable city = '';
  @observable country = '';
  @observable education = '';
  @observable email = '';
  @observable groups_played = '';
  @observable homepage_link = '';
  @observable music_education = '';
  @observable own_group = '';
  @observable portfolio_link = '';
  @observable tools_own = '';
  @observable updated_at = new Date;
  @observable created_at = new Date;

  notificationsStore: NotificationsStore;

  constructor(initialData: UserStore | UserI | null, { notificationsStore }: ImportStore) {
    makeObservable(this);

    this.notificationsStore = notificationsStore;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async upload(file: File) {
    try {

      const {path} = await API.request<UploadAvatarResponse>(`user/upload`, {
        method: METHODS_REQUEST.POST,
        body: API.getFormData({ file })
      });

      this.avatar = path;

      this.notificationsStore.add({
        type: NOTIFICATION_TYPE.SUCCESS,
        id: this.notificationsStore.generateID(),
        title: 'Success',
        message: 'You avatar upload.'
      });
    } catch (e) {
      this.notificationsStore.add({
        type: NOTIFICATION_TYPE.ERROR,
        id: this.notificationsStore.generateID(),
        title: 'Error',
        message: 'Not upload avatar. Please repeat.'
      });
      console.error(`Error in method upload : `, e);
    }
  }

  @computed
  get fullName(): string {
    return (this.first_name.length > 0 && this.last_name.length > 0) ? `${this.first_name} ${this.last_name}` : '';
  }

  @action
  fillingStore(data: UserStore | UserI) {
    const {
      id,
      first_name,
      last_name,
      avatar,
      birthday,
      city,
      country,
      education,
      email,
      groups_played,
      homepage_link,
      music_education,
      own_group,
      portfolio_link,
      tools_own,
      created_at,
      updated_at
    } = data;

    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.avatar = avatar;
    this.birthday = birthday;
    this.city = city;
    this.country = country;
    this.education = education;
    this.groups_played = groups_played;
    this.homepage_link = homepage_link;
    this.music_education = music_education;
    this.own_group = own_group;
    this.portfolio_link = portfolio_link;
    this.tools_own = tools_own;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

}

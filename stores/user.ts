import { action, computed, makeObservable, observable } from 'mobx';
import { UserI, UserUpdateI } from '../interfaces';
import { METHODS_REQUEST, NOTIFICATION_TYPE, SERVICE_ID } from '../constants';
import { API } from '../core';
import { UploadAvatarResponse } from '../responsible';
import { TrialVersionStore } from './trial-version';
import { PurchaseStore } from './purchase';
import { RootStore } from './index';
import moment, { Moment } from 'moment';

let rootStore: RootStore;

export class UserStore implements UserI {
  @observable id = 0;
  @observable first_name = '';
  @observable last_name = '';
  @observable avatar = '';
  @observable birthday: Moment | null = null;
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
  @observable updated_at = moment();
  @observable created_at = moment();
  @observable trial_version = new TrialVersionStore(null);
  @observable purchases: PurchaseStore[] = [];
  @observable discount = false;

  constructor(initialData: UserStore | UserI | null, root: RootStore) {
    makeObservable(this);
    rootStore = root;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async upload(file: File) {
    try {
      const { path } = await API.request<UploadAvatarResponse>(`users/upload`, {
        method: METHODS_REQUEST.POST,
        body: API.getFormData({ file })
      });

      this.avatar = path;

      rootStore.notificationsStore.add({
        type: NOTIFICATION_TYPE.SUCCESS,
        id: rootStore.notificationsStore.generateID(),
        title: 'Success',
        message: 'You avatar upload.'
      });
    } catch (e) {
      rootStore.notificationsStore.add({
        type: NOTIFICATION_TYPE.ERROR,
        id: rootStore.notificationsStore.generateID(),
        title: 'Error',
        message: 'Not upload avatar. Please repeat.'
      });
      console.error(`Error in method upload : `, e);
    }
  }

  @action.bound
  async update(values: UserUpdateI) {
    try {
      const response = await API.request<UserI>(`users/update`, {
        method: METHODS_REQUEST.POST,
        body: API.getFormData(values)
      });

      this.fillingStore(response);

      rootStore.notificationsStore.add({
        type: NOTIFICATION_TYPE.SUCCESS,
        id: rootStore.notificationsStore.generateID(),
        title: 'Success',
        message: 'Your profile update'
      });
    } catch (e) {
      console.error(`Error in method update : `, e);

      rootStore.notificationsStore.add({
        type: NOTIFICATION_TYPE.ERROR,
        id: rootStore.notificationsStore.generateID(),
        title: 'Error',
        message: (e && Array.isArray(e.errors) && e.errors.join('<br/>')) || 'Repeat please'
      });
    }
  }

  @action.bound
  checkSubscription(service_id: SERVICE_ID, instrument_id: number): PurchaseStore[] {
    return this.purchases.filter((purchase) => {
      return purchase.service_id === service_id && purchase.instrument_id === instrument_id;
    });
  }

  @computed
  get fullName(): string {
    return this.first_name.length > 0 && this.last_name.length > 0 ? `${this.first_name} ${this.last_name}` : '';
  }

  @computed
  get isPurchases(): any {
    return '';
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
      updated_at,
      trial_version,
      discount,
      purchases
    } = data;

    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.avatar = avatar;
    this.birthday = moment(birthday);
    this.city = city;
    this.country = country;
    this.education = education;
    this.email = email;
    this.groups_played = groups_played;
    this.homepage_link = homepage_link;
    this.music_education = music_education;
    this.own_group = own_group;
    this.portfolio_link = portfolio_link;
    this.tools_own = tools_own;
    this.created_at = moment(created_at);
    this.updated_at = moment(updated_at);
    this.trial_version = new TrialVersionStore(trial_version);
    this.discount = discount;
    this.purchases = (purchases || []).map((purchase) => new PurchaseStore(purchase, rootStore));
  }
}

import { action, computed, makeObservable, observable } from 'mobx';
import { UserI } from '../interfaces';

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

  constructor(initialData: UserStore | UserI | null) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
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

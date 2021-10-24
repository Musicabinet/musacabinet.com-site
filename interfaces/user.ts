import { TrialVersionStore } from '../stores/trial-version';
import { PurchaseStore } from '../stores/purchase';
import { Moment } from 'moment';

export interface UserI {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string,
  birthday: Moment | null,
  country: string,
  city: string,
  education: string,
  music_education: string,
  tools_own: string,
  own_group: string,
  groups_played: string,
  portfolio_link: string,
  homepage_link: string,
  created_at: Moment,
  updated_at: Moment,
  trial_version: TrialVersionStore,
  purchases: PurchaseStore[],
  discount: boolean
}

export interface UserUpdateI {
  first_name: string;
  last_name: string;
  country: string;
  city: string;
  education: string;
  music_education: string;
}

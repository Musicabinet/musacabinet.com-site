import { TrialVersionStore } from '../stores/trial-version';
import { PurchaseStore } from '../stores/purchase';

export interface UserI {
  id: number,
  avatar: string,
  birthday: Date | undefined,
  city: string,
  country: string,
  education: string,
  email: string,
  first_name: string,
  groups_played: string,
  homepage_link: string,
  last_name: string,
  music_education: string,
  own_group: string,
  portfolio_link: string,
  tools_own: string,
  updated_at: Date,
  created_at: Date,
  trial_version: TrialVersionStore
  purchases: PurchaseStore[]
}

export interface UserUpdateI {
  first_name: string,
  last_name: string,
  country: string,
  city: string,
  education: string,
  music_education: string
}

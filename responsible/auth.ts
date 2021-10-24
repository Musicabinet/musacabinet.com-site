import { UserI } from '../interfaces';

export interface LoginResponse {
  access_token: string;
  expires: number;
  isNew: boolean;
  user: UserI;
}

import { UserI } from '../interfaces';

export interface LoginFacebookResponse{
  expires: number,
  isNew: boolean,
  success: boolean,
  token: string,
  type: string,
  user: UserI
}

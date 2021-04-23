import { NOTIFICATION_TYPE } from '../constants';

export interface NotificationI{
  id: string,
  title: string,
  message: string,
  type: NOTIFICATION_TYPE
}

import { SERVICE_ID } from '../constants';
import { LIST_ICON } from '../ui/common/icons';

export interface InstrumentI {
  id: number;
  service_id: SERVICE_ID;
  sort: number;
  slug: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  name: string;
  description: string;
  icon: LIST_ICON.GUITAR | LIST_ICON.SAXOPHONE | LIST_ICON.KEYBOARD;
  is_active: boolean;
}

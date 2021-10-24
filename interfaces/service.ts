import { InstrumentStore } from '../stores/instrument';

export interface ServiceI {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  instruments: InstrumentStore[];
}

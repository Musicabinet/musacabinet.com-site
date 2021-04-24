import { InstrumentI } from './instrument';

export interface ServiceI {
  id: number,
  name: string,
  slug: string,
  is_active: boolean,
  instruments: InstrumentI[]
}

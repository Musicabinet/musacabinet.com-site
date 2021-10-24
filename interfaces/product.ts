import { SERVICE_ID } from '../constants';
import { ProductItemStore } from '../stores/product-item';
import { ProductInstrumentStore } from '../stores/product-instrument';

export interface ProductI {
  id: number,
  service_id: SERVICE_ID,
  instrument_id: number,
  product_duration_id: number,
  instrument: ProductInstrumentStore,
  type: PRODUCT_TYPE,
  level: string,
  description: string,
  month: number,
  sale_price: number,
  price: number,
  for_sale: boolean,
  items: ProductItemStore[]
}

export interface ProductItemI {
  id: number,
  name: string
}

export interface ProductInstrumentI {
  id: number,
  slug: string
}

export enum PRODUCT_DURATION {
  Monthly = 'Monthly',
  Yearly = 'Yearly',
  Forever = 'Forever'
}

export const PRODUCT_DURATION_MAPPING_IDS = {
  Monthly: 1,
  Yearly: 2,
  Forever: 3
};

export enum PRODUCT_TYPE {
  DISCOUNT = 'discount',
  STANDARD = 'standard'
}

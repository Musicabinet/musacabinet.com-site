import { SERVICE_NAME } from '../constants';

export interface PriceI {
  name: string,
  price: number,
  old_price: number,
  count_mount: number
}

export interface PriceListI {
  [key: string]: PriceI[]
}

export enum TERM_LIST {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  FOREVER = 'FOREVER'
}

export type PriceInformationType = {
  [key in SERVICE_NAME]: {
    title: string,
    prices: {
      [key in 'guitar' | 'keyboard' | 'saxophone']: PlansPrice
    }
    plans: TERM_LIST[],
    list: {
      [key in 'guitar' | 'keyboard' | 'saxophone']: string[]
    },
    extra: string
  }
}

export type PlansPrice = {
  discount: PriceTerm,
  standard: PriceTerm
}


export type PriceTerm = {
  [key in TERM_LIST]: {
    current: number,
    old: number,
    id: string
  }
}

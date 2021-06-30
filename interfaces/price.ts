export interface PriceI {
  name: string,
  price: number,
  old_price: number,
  count_mount: number
}

export interface PriceListI {
  [key: string]: PriceI[]
}

export enum TERM_LIST{
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  FOREVER = 'FOREVER'
}

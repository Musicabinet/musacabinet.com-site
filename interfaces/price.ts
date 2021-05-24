export interface PriceI {
  name: string,
  price: number,
  old_price: number
}

export interface PriceListI {
  [key: string]: PriceI[]
}

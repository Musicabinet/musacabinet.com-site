export interface PriceI {
  name: string,
  price: number,
  old_price: number,
  count_mount: number
}

export interface PriceListI {
  [key: string]: PriceI[]
}

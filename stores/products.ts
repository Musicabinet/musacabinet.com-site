import { action, computed, makeObservable, observable } from 'mobx';
import { ProductStore } from './product';
import { API } from '../core';
import { PRODUCT_DURATION_MAPPING_IDS, PRODUCT_TYPE, ProductI } from '../interfaces';
import { RootStore } from './index';

let rootStore: RootStore;

export class ProductsStore {

  static PATH = 'products';

  @observable list: ProductStore[] = [];

  constructor(initialData: ProductsStore | null, root: RootStore) {
    makeObservable(this);

    rootStore = root;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  async getList() {
    try {
      const response = await API.request<ProductI[]>(`${ProductsStore.PATH}/list`);
      this.list = response.map((product) => new ProductStore(product));
    } catch (e) {
      console.error(`Error in method ProductsStore.getList : `, e);
    }
  }

  @computed
  get getProducts(): ProductStore[] {
    const isDiscount = rootStore.userStore.discount;
    const currentTypeProduct = (isDiscount) ? PRODUCT_TYPE.DISCOUNT : PRODUCT_TYPE.STANDARD;

    let result: ProductStore[] = [];

    // Поиск
    result = this.list.filter((product) => (
      product.instrument.slug.toLowerCase() === rootStore.pricingStore.selected_instrument_icon.toLowerCase() &&
      product.product_duration_id === PRODUCT_DURATION_MAPPING_IDS[rootStore.pricingStore.selected_product_duration] &&
      product.type === currentTypeProduct
    ));

    return result;
  }

  @action
  fillingStore(data: ProductsStore) {
    const { list } = data;
    this.list = (list || []).map((product) => new ProductStore(product));
  }

}

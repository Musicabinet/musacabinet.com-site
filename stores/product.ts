import { action, computed, makeObservable, observable } from 'mobx';
import { PRODUCT_TYPE, ProductI } from '../interfaces';
import { SERVICE_ID, SERVICE_MAPPING } from '../constants';
import { ProductItemStore } from './product-item';
import { ProductInstrumentStore } from './product-instrument';
import { LIST_ICON } from '../ui/common/icons';

export class ProductStore implements ProductI {

  @observable id = 0;
  @observable service_id = SERVICE_ID.SCHOOL;
  @observable instrument_id = 0;
  @observable product_duration_id = 0;
  @observable instrument: ProductInstrumentStore = new ProductInstrumentStore(null);
  @observable type = PRODUCT_TYPE.DISCOUNT;
  @observable level = '';
  @observable description = '';
  @observable month = 0;
  @observable sale_price = 0;
  @observable price = 0;
  @observable for_sale = false;
  @observable items: ProductItemStore[] = [];


  constructor(initialData: ProductStore | ProductI | null) {
    makeObservable(this);

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @computed
  get serviceName() {
    return SERVICE_MAPPING[this.service_id];
  }

  @computed
  get serviceNameUpperCase(): LIST_ICON {
    return SERVICE_MAPPING[this.service_id].toUpperCase() as LIST_ICON;
  }

  @action
  fillingStore(data: ProductStore | ProductI) {
    const {
      id,
      service_id,
      instrument_id,
      product_duration_id,
      instrument,
      type,
      level,
      description,
      month,
      sale_price,
      price,
      for_sale,
      items
    } = data;

    this.id = id;
    this.service_id = service_id;
    this.instrument_id = instrument_id;
    this.product_duration_id = product_duration_id;
    this.instrument = new ProductInstrumentStore(instrument);
    this.type = type;
    this.level = level;
    this.description = description;
    this.month = month;
    this.sale_price = sale_price;
    this.price = price;
    this.for_sale = for_sale;
    this.items = (items || []).map((productItem) => new ProductItemStore(productItem));
  }

}

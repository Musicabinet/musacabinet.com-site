import { action, computed, makeObservable, observable } from 'mobx';
import { PriceI, PriceListI, TERM_LIST } from '../interfaces';
import { SystemStore } from './system';
import { SERVICE_NAME } from '../constants';
import { LIST_ICON } from '../ui/common/icons';

interface ImportStore {
  systemStore: SystemStore,
}

export class PricingStore {

  @observable selected_instrument_icon: LIST_ICON = LIST_ICON.GUITAR;
  @observable selected_term: TERM_LIST = TERM_LIST.MONTHLY;

  @observable list: PriceListI = {
    [SERVICE_NAME.SCHOOL]: [{
      name: '1 month',
      old_price: 30,
      price: 21,
      count_mount: 1
    }, {
      name: '3 months',
      old_price: 75,
      price: 55,
      count_mount: 3
    }, {
      name: '6 months',
      old_price: 120,
      price: 89,
      count_mount: 6
    }],
    [SERVICE_NAME.COLLEGE]: [{
      name: '1 month',
      old_price: 100,
      price: 75,
      count_mount: 1
    }, {
      name: '6 months',
      old_price: 480,
      price: 360,
      count_mount: 6
    }, {
      name: '12 months',
      old_price: 720,
      price: 540,
      count_mount: 12
    }]
  };

  @observable month = 0;
  @observable selected_instrument = 'guitar';


  @observable information: any = {
    [SERVICE_NAME.SCHOOL]: {
      title: 'Beginner',
      prices: {
        [TERM_LIST.MONTHLY]: {
          current: 15,
          old: 30,
          id: 'price_1J7GoWHTf8fYJsx5Q62KZJrA'
        },
        [TERM_LIST.YEARLY]: {
          current: 120,
          old: 240,
          id: 'price_1J7GqhHTf8fYJsx56Pyh6tvo'
        }
      },
      list: {
        'guitar': [
          '149 Lessons',
          '190 Miditracks',
          '150 Backingtrack',
          '50 SRM1 Sheets',
          '50 REM Sheets',
          '12 GYM Exercises'
        ],
        'keyboard': [
          '135 Lessons',
          '190 Miditracks',
          '145 Backingtrack',
          '50 SRM Sheets',
          '50 REM Sheets'
        ],
        'saxophone': [
          '115 Lessons',
          '210 Miditracks',
          '130 Backingtrack',
          '50 SRM Sheets',
          '50 REM Sheets'
        ]
      }

    },
    [SERVICE_NAME.COLLEGE]: {
      title: 'Advanced',
      prices: {
        [TERM_LIST.MONTHLY]: {
          current: 75,
          old: 100
        },
        [TERM_LIST.YEARLY]: {
          current: 630,
          old: 840
        }
      },
      list: {
        'guitar': [
          '149 Lessons',
          '190 Miditracks',
          '150 Backingtrack',
          '50 SRM1 Sheets',
          '50 REM Sheets',
          '12 GYM Exercises'
        ],
        'keyboard': [
          '135 Lessons',
          '190 Miditracks',
          '145 Backingtrack',
          '50 SRM Sheets',
          '50 REM Sheets'
        ],
        'saxophone': [
          '115 Lessons',
          '210 Miditracks',
          '130 Backingtrack',
          '50 SRM Sheets',
          '50 REM Sheets'
        ]
      }
    },
    [SERVICE_NAME.UNIVERSITY]: {
      title: 'Professional',
      prices: {
        [TERM_LIST.MONTHLY]: {
          current: 149,
          old: 199
        },
        [TERM_LIST.YEARLY]: {
          current: 1159,
          old: 1549
        }
      },
      list: {
        'guitar': [
          '149 Lessons',
          '190 Miditracks',
          '150 Backingtrack',
          '50 SRM1 Sheets',
          '50 REM Sheets',
          '12 GYM Exercises'
        ],
        'keyboard': [
          '135 Lessons',
          '190 Miditracks',
          '145 Backingtrack',
          '50 SRM Sheets',
          '50 REM Sheets'
        ],
        'saxophone': [
          '115 Lessons',
          '210 Miditracks',
          '130 Backingtrack',
          '50 SRM Sheets',
          '50 REM Sheets'
        ]
      }
    }
  };


  systemStore: SystemStore;

  constructor(initialData: PricingStore | null, { systemStore }: ImportStore) {
    makeObservable(this);
    this.systemStore = systemStore;

    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action.bound
  setMonth(month = 0) {
    this.month = month;
  }

  @action.bound
  setInstrument(instrument: string) {
    this.selected_instrument = instrument;
  }

  @action.bound
  async generateButtonPayPal() {
    try {

    } catch (e) {
      console.error(`Error in method generateButtonPayPal : `, e);
    }
  }

  @action.bound
  setSelectedInstrumentIcon(value: LIST_ICON) {
    this.selected_instrument_icon = value;
    this.selected_term = TERM_LIST.MONTHLY;
  }

  @action.bound
  setSelectedTerm(value: TERM_LIST) {
    this.selected_term = value;
  }

  @computed
  get prices(): PriceI[] {
    if (this.systemStore.service_name) {
      return this.list[this.systemStore.service_name] || [];
    } else {
      return this.list[SERVICE_NAME.SCHOOL] || [];
    }
  }

  @computed
  get price() {
    return (this.prices && this.prices.length > 0) ? this.prices[this.month].price : '';
  }

  @computed
  get oldPrice() {
    return (this.prices && this.prices.length > 0) ? this.prices[this.month].old_price : '';
  }

  @computed
  get countMonth(): number {
    return (this.prices && this.prices.length > 0) ? this.prices[this.month].count_mount : 0;
  }

  @action
  fillingStore(data: PricingStore) {
    const {} = data;
  }

}

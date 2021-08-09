import { action, computed, makeObservable, observable } from 'mobx';
import { PriceI, PriceInformationType, PriceListI, TERM_LIST } from '../interfaces';
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


  @observable information: PriceInformationType = {
    [SERVICE_NAME.SCHOOL]: {
      title: 'Beginner',
      prices: {
        [LIST_ICON.GUITAR]: {
          discount: {
            [TERM_LIST.MONTHLY]: {
              current: 15,
              old: 30,
              id: 'price_1J7GoWHTf8fYJsx5Q62KZJrA'
            },
            [TERM_LIST.YEARLY]: {
              current: 120,
              old: 240,
              id: 'price_1J7GqhHTf8fYJsx56Pyh6tvo'
            },
            [TERM_LIST.FOREVER]: {
              current: 0,
              old: 0,
              id: ''
            }
          },
          standard: {
            [TERM_LIST.MONTHLY]: {
              current: 21,
              old: 30,
              id: 'price_1IzeXVHTf8fYJsx5dWO88a6Z'
            },
            [TERM_LIST.YEARLY]: {
              current: 179,
              old: 240,
              id: 'price_1J7GqhHTf8fYJsx5jiDGH33l'
            },
            [TERM_LIST.FOREVER]: {
              current: 0,
              old: 0,
              id: ''
            }
          }
        },
        [LIST_ICON.SAXOPHONE]: {
          discount: {
            [TERM_LIST.MONTHLY]: {
              current: 15,
              old: 30,
              id: 'price_1J7Gz8HTf8fYJsx5wBZxTfq5'
            },
            [TERM_LIST.YEARLY]: {
              current: 120,
              old: 240,
              id: 'price_1J7H0DHTf8fYJsx5wwR2Onkg'
            },
            [TERM_LIST.FOREVER]: {
              current: 0,
              old: 0,
              id: ''
            }
          },
          standard: {
            [TERM_LIST.MONTHLY]: {
              current: 21,
              old: 30,
              id: 'price_1IzevkHTf8fYJsx55wnEQwUQ'
            },
            [TERM_LIST.YEARLY]: {
              current: 179,
              old: 240,
              id: 'price_1IzetoHTf8fYJsx5aDaSohAs'
            },
            [TERM_LIST.FOREVER]: {
              current: 0,
              old: 0,
              id: ''
            }
          }
        },
        [LIST_ICON.KEYBOARD]: {
          discount: {
            [TERM_LIST.MONTHLY]: {
              current: 15,
              old: 30,
              id: 'price_1J7GwjHTf8fYJsx5zAHuhs4N'
            },
            [TERM_LIST.YEARLY]: {
              current: 120,
              old: 240,
              id: 'price_1J7GyNHTf8fYJsx5IIIcWNNW'
            },
            [TERM_LIST.FOREVER]: {
              current: 0,
              old: 0,
              id: ''
            }
          },
          standard: {
            [TERM_LIST.MONTHLY]: {
              current: 21,
              old: 30,
              id: 'price_1IzepZHTf8fYJsx5vG1Vnitk'
            },
            [TERM_LIST.YEARLY]: {
              current: 179,
              old: 240,
              id: 'price_1IzenfHTf8fYJsx5WDNAuw2W'
            },
            [TERM_LIST.FOREVER]: {
              current: 0,
              old: 0,
              id: ''
            }
          }
        }

      },
      plans: [TERM_LIST.MONTHLY, TERM_LIST.YEARLY],
      list: {
        [LIST_ICON.GUITAR]: [
          `149 Lessons <b></b>`,
          `190 Midi Tracks`,
          `150 Backing Tracks`,
          `50 SRM <sup>1</sup> Sheets`,
          `50 REM <sup>2</sup> Sheets`,
          `12 GYM Exercises`
        ],
        [LIST_ICON.KEYBOARD]: [
          `135 Lessons`,
          `190 Midi Tracks`,
          `145 Backing Tracks`,
          `50 SRM <sup>1</sup> Sheets`,
          `50 REM <sup>2</sup> Sheets`
        ],
        [LIST_ICON.SAXOPHONE]: [
          `115 Lessons`,
          `210 Midi Tracks`,
          `130 Backing Tracks`,
          `50 SRM <sup>1</sup> Sheets`,
          `50 REM <sup>2</sup> Sheets`
        ]
      },
      extra: 'Includes 4 COLLEGE Lessons'
    },
    [SERVICE_NAME.COLLEGE]: {
      title: 'Advanced',
      prices: {
        [LIST_ICON.GUITAR]: {
          discount: {
            [TERM_LIST.MONTHLY]: {
              current: 50,
              old: 75,
              id: 'price_1J7H1eHTf8fYJsx5zCqxjNPN'
            },
            [TERM_LIST.YEARLY]: {
              current: 420,
              old: 630,
              id: 'price_1J7H4XHTf8fYJsx5hGfw18MM'
            },
            [TERM_LIST.FOREVER]: {
              current: 0,
              old: 0,
              id: ''
            }
          },
          standard: {
            [TERM_LIST.MONTHLY]: {
              current: 75,
              old: 100,
              id: 'price_1IzeZjHTf8fYJsx5qbkXV6aN'
            },
            [TERM_LIST.YEARLY]: {
              current: 630,
              old: 840,
              id: 'price_1J7H4XHTf8fYJsx5HWiykIyJ'
            },
            [TERM_LIST.FOREVER]: {
              current: 0,
              old: 0,
              id: ''
            }
          }
        },
        [LIST_ICON.SAXOPHONE]: {
          discount: {
            [TERM_LIST.MONTHLY]: {
              current: 50,
              old: 75,
              id: 'price_1J7H7ZHTf8fYJsx5Kx8qXBe0'
            },
            [TERM_LIST.YEARLY]: {
              current: 420,
              old: 630,
              id: 'price_1J7H79HTf8fYJsx5mjIiM2xe'
            },
            [TERM_LIST.FOREVER]: {
              current: 0,
              old: 0,
              id: ''
            }
          },
          standard: {
            [TERM_LIST.MONTHLY]: {
              current: 75,
              old: 100,
              id: 'price_1HpAPqHTf8fYJsx5cFUx3B1A'
            },
            [TERM_LIST.YEARLY]: {
              current: 630,
              old: 840,
              id: 'price_1HpAOZHTf8fYJsx5vxEIUHz2'
            },
            [TERM_LIST.FOREVER]: {
              current: 0,
              old: 0,
              id: ''
            }
          }
        },
        [LIST_ICON.KEYBOARD]: {
          discount: {
            [TERM_LIST.MONTHLY]: {
              current: 50,
              old: 75,
              id: 'price_1J7H68HTf8fYJsx5M0T9CkEq'
            },
            [TERM_LIST.YEARLY]: {
              current: 420,
              old: 630,
              id: 'price_1J7H5aHTf8fYJsx5vWKCcpRG'
            },
            [TERM_LIST.FOREVER]: {
              current: 0,
              old: 0,
              id: ''
            }
          },
          standard: {
            [TERM_LIST.MONTHLY]: {
              current: 75,
              old: 100,
              id: 'price_1HpAL2HTf8fYJsx5xEpb2qD8'
            },
            [TERM_LIST.YEARLY]: {
              current: 630,
              old: 840,
              id: 'price_1HpAJYHTf8fYJsx5pQg2FLU9'
            },
            [TERM_LIST.FOREVER]: {
              current: 0,
              old: 0,
              id: ''
            }
          }
        }
      },
      plans: [TERM_LIST.MONTHLY, TERM_LIST.YEARLY],
      list: {
        [LIST_ICON.GUITAR]: [
          `192 Lessons`,
          `180 Midi Tracks`,
          `240 Backing Tracks`,
          `50 SRM <sup>1</sup> Sheets`,
          `50 REM Sheets`,
          `12 GYM Exercises`
        ],
        [LIST_ICON.KEYBOARD]: [
          `175 Lessons`,
          `160 Backing Tracks`,
          `50 SRM <sup>1</sup> Sheets`,
          `50 REM <sup>2</sup> Sheets`
        ],
        [LIST_ICON.SAXOPHONE]: [
          `188 Lessons`,
          `145 Backing Tracks`,
          `50 SRM <sup>1</sup> Sheets`,
          `50 REM <sup>2</sup> Sheets`
        ]
      },
      extra: 'Includes SCHOOL subscription'
    },
    [SERVICE_NAME.UNIVERSITY]: {
      title: 'Professional',
      prices: {
        [LIST_ICON.GUITAR]: {
          discount: {
            [TERM_LIST.MONTHLY]: {
              current: 99,
              old: 149,
              id: 'price_1J7HDSHTf8fYJsx5oF9PHmFr'
            },
            [TERM_LIST.YEARLY]: {
              current: 769,
              old: 1159,
              id: 'price_1J7HElHTf8fYJsx5qzYZg52u'
            },
            [TERM_LIST.FOREVER]: {
              current: 1997,
              old: 2997,
              id: 'price_1J7HFuHTf8fYJsx55x1hmfHy'
            }
          },
          standard: {
            [TERM_LIST.MONTHLY]: {
              current: 149,
              old: 199,
              id: 'price_1J7HDSHTf8fYJsx5hTvQa1rT'
            },
            [TERM_LIST.YEARLY]: {
              current: 1159,
              old: 1549,
              id: 'price_1J7HElHTf8fYJsx56GNVuoKA'
            },
            [TERM_LIST.FOREVER]: {
              current: 2997,
              old: 3997,
              id: 'price_1J7HFuHTf8fYJsx5xlWCQRJG'
            }
          }
        },
        [LIST_ICON.SAXOPHONE]: {
          discount: {
            [TERM_LIST.MONTHLY]: {
              current: 99,
              old: 149,
              id: 'price_1J7HNfHTf8fYJsx5KxonLDRN'
            },
            [TERM_LIST.YEARLY]: {
              current: 769,
              old: 1159,
              id: 'price_1J7HMzHTf8fYJsx5bi4231lC'
            },
            [TERM_LIST.FOREVER]: {
              current: 1997,
              old: 2997,
              id: 'price_1J7HOFHTf8fYJsx5aiB3XOSr'
            }
          },
          standard: {
            [TERM_LIST.MONTHLY]: {
              current: 149,
              old: 199,
              id: 'price_1J7HNfHTf8fYJsx5Y552n6Mk'
            },
            [TERM_LIST.YEARLY]: {
              current: 1159,
              old: 1549,
              id: 'price_1J7HMzHTf8fYJsx5d4p1XMcJ'
            },
            [TERM_LIST.FOREVER]: {
              current: 2997,
              old: 3997,
              id: 'price_1J7HOFHTf8fYJsx5LK8kJL0R'
            }
          }
        },
        [LIST_ICON.KEYBOARD]: {
          discount: {
            [TERM_LIST.MONTHLY]: {
              current: 99,
              old: 149,
              id: 'price_1J7HHiHTf8fYJsx5oj002HnY'
            },
            [TERM_LIST.YEARLY]: {
              current: 769,
              old: 1159,
              id: 'price_1J7HIUHTf8fYJsx5vRhKWFA3'
            },
            [TERM_LIST.FOREVER]: {
              current: 1997,
              old: 2997,
              id: 'price_1J7HLOHTf8fYJsx5vtEZgbaR'
            }
          },
          standard: {
            [TERM_LIST.MONTHLY]: {
              current: 149,
              old: 199,
              id: 'price_1J7HHiHTf8fYJsx5iK9AHSh3'
            },
            [TERM_LIST.YEARLY]: {
              current: 1159,
              old: 1549,
              id: 'price_1J7HIUHTf8fYJsx50Hz1VoMd'
            },
            [TERM_LIST.FOREVER]: {
              current: 2997,
              old: 3997,
              id: 'price_1J7HLOHTf8fYJsx5Pm3S60Js'
            }
          }
        }
      },
      plans: [TERM_LIST.MONTHLY, TERM_LIST.YEARLY, TERM_LIST.FOREVER],
      list: {
        [LIST_ICON.GUITAR]: [
          `1001 Lessons`,
          `420 Backing Tracks`,
          `110 000 IGM Sheets`,
          `50 SRM <sup>1</sup> Sheets`,
          `50 REM2 <sup>2</sup> Sheets`,
          `12 GYM Exercises`
        ],
        [LIST_ICON.KEYBOARD]: [
          `760 Lessons`,
          `890 Backing Tracks`,
          `70 000 IGM Sheets`,
          `50 SRM <sup>1</sup> Sheets`,
          `50 REM2 <sup>2</sup> Sheets`
        ],
        [LIST_ICON.SAXOPHONE]: [
          `460 Lessons`,
          `750 Backing Tracks`,
          `70 000 IGM Sheets`,
          `50 SRM <sup>1</sup> Sheets`,
          `50 REM2 <sup>2</sup> Sheets`
        ]
      },
      extra: 'Includes SCHOOL and COLLEGE'
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
    console.log('change instrument', instrument);
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

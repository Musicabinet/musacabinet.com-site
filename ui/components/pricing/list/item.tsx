import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './list.module.sass';
import {
  CloudPaymentOptionsI,
  CloudPaymentPaymentResult,
  PriceInformationType,
  ServiceI,
  TERM_LIST
} from '../../../../interfaces';
import { InstrumentIcon } from '../../../common';
import { getIcon, LIST_ICON } from '../../../common/icons';
import { RootStore } from '../../../../stores';
import { MODALS, SERVICE_NAME } from '../../../../constants';
import { UserStore } from '../../../../stores/user';
import { PricingStore } from '../../../../stores/pricing';
import { PurchasesStore } from '../../../../stores/purchases';

const b = block(style);

type ItemProps = {
  pricingStore: PricingStore,
  purchasesStore: PurchasesStore
  user: UserStore,
  isAuth: boolean,
  information: PriceInformationType,
  selected_term: TERM_LIST,
  selected_instrument: LIST_ICON.GUITAR | LIST_ICON.SAXOPHONE | LIST_ICON.KEYBOARD,
  onShowModal: (id_modal: MODALS) => void
};
type ItemState = {
  stripe: any
};

@inject((store: RootStore) => ({
  pricingStore: store.pricingStore,
  purchasesStore: store.purchasesStore,
  user: store.userStore,
  isAuth: store.authStore.isAuth,
  information: store.pricingStore.information,
  selected_term: store.pricingStore.selected_term,
  selected_instrument: store.pricingStore.selected_instrument_icon,
  onShowModal: store.modalsStore.show
}))
@observer
export class Item extends React.Component<ItemProps & ServiceI, ItemState> {

  static defaultProps = {
    pricingStore: {},
    purchasesStore: {},
    user: {},
    isAuth: false,
    information: {},
    selected_term: TERM_LIST.MONTHLY,
    selected_instrument: 'guitar',
    onShowModal: () => console.log('Not set handler')
  };

  async componentDidMount() {
  }

  async order(sum: number) {
    const { user, selected_term, purchasesStore } = this.props;

    try {
      // @ts-ignore
      const widget = new window.cp.CloudPayments({
        language: 'en-US'
      });

      let data: any = {};
      let date = new Date();
      date.setMonth(date.getMonth() + 1);

      data.payload = {
        service_id: this.props.id,
        instrument_id: this.props.pricingStore.selected_instrument_id,
        period: selected_term === 'YEARLY' ? 12 : 1,
      };

      data.CloudPayments = {
        recurrent: {
          interval: 'Month',
          period: selected_term === 'YEARLY' ? 12 : 1,
          startDate: date
        }
      };

      widget.pay('auth', {
          publicId: 'pk_e3786ad7b070a8a0ba3f8c8e92b7e',
          description: 'Pay order musicabinet.com',
          amount: sum,
          currency: 'USD',
          accountId: user.email, //идентификатор плательщика (необязательно)
          skin: 'mini',
          data: data,
          retryPayment: true
        },
        {
          onSuccess: async function(options: any) { // success
            let payload = options.data.payload;

            // Сохраняем платеж
            await purchasesStore.create(payload);

            //действие при успешной оплате
            if (window) {
              window.location.href = '/cabinet';
            }
          },
          onFail: function(reason: any, options: any) { // fail
            console.log(reason, options);
            //действие при неуспешной оплате
          },
          onComplete: function(paymentResult: CloudPaymentPaymentResult, _options: CloudPaymentOptionsI) {
            if (paymentResult.success) {

            }
          }
        });
    } catch (e) {
      console.error(`Error in method loadCloudPayments:`, e);
    }
  }

  onPay = () => {

  };


  render() {
    const {
      slug,
      information,
      selected_term,
      selected_instrument,
      isAuth,
      user,
      pricingStore,
      id: service_id
    } = this.props;
    const service_name = slug as SERVICE_NAME;
    const trialVersionIsValid: boolean = user.trial_version.isValid;


    if (!information[service_name].prices) {
      return false;
    }

    const selectedInstrumentPrice = information[service_name];
    const selectedPrices = selectedInstrumentPrice.prices[selected_instrument];
    const currentPrices = (isAuth)
      ? trialVersionIsValid
        ? selectedPrices.discount : selectedPrices.standard
      : selectedPrices.standard;
    const currentPeriod = currentPrices[selected_term];

    const current_sum = currentPeriod.current;
    const old_sum = currentPeriod.old;
    const extra = information[service_name].extra;
    const plans = selectedInstrumentPrice.plans;
    const list = selectedInstrumentPrice.list[selected_instrument];

    const hiddenPayButton = user.purchases.some((item) => item.service_id === service_id && item.instrument_id === pricingStore.selected_instrument_id);

    return (
      <div className={b('item', {
        [service_name]: true,
        'not-hover': (!plans.includes(selected_term))
      })}>
        <div className={b('icon')}>
          {/*
           // @ts-ignore */}
          <InstrumentIcon icon={service_name.toUpperCase() as LIST_ICON} service={'white'} />
        </div>
        <div className={b('name')}>{slug}</div>
        <div className={b('description')}>{information[service_name].title}</div>

        <div className={b('price', { hidden: !plans.includes(selected_term) })}>$ <span>{current_sum}</span></div>
        <div className={b('old', { hidden: !plans.includes(selected_term) })}>${old_sum}</div>

        {!hiddenPayButton && (
          <div className={b('action')}>
            <button onClick={() => this.order(current_sum)}
                    disabled={(!plans.includes(selected_term))}
                    className={b('button', { [slug]: true })}>{(plans.includes(selected_term)) ? 'Buy plan' : 'Unavailable'}
            </button>
          </div>
        )}


        <div className={b('list')}>
          {list.map((item: any) => {
            return <div key={item} className={b('list-item')}>
              <i className={b('check', { [service_name]: true })}>
                {getIcon(LIST_ICON.CHECK, '')}
              </i>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </div>;
          })}
        </div>

        <div className={b('divider', { [service_name]: true })} />
        <div className={b('extra')}>{extra}</div>
      </div>
    );
  }

}

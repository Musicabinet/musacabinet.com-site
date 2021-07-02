import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './list.module.sass';
import { PriceInformationType, ServiceI, TERM_LIST } from '../../../../interfaces';
import { InstrumentIcon } from '../../../common';
import { getIcon, LIST_ICON } from '../../../common/icons';
import { RootStore } from '../../../../stores';
import { MODALS, SERVICE_NAME } from '../../../../constants';

const b = block(style);

type ItemProps = {
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
  isAuth: store.authStore.isAuth,
  information: store.pricingStore.information,
  selected_term: store.pricingStore.selected_term,
  selected_instrument: store.pricingStore.selected_instrument_icon,
  onShowModal: store.modalsStore.show
}))
@observer
export class Item extends React.Component<ItemProps & ServiceI, ItemState> {

  static defaultProps = {
    isAuth: false,
    information: {},
    selected_term: TERM_LIST.MONTHLY,
    selected_instrument: 'guitar',
    onShowModal: () => console.log('Not set handler')
  };

  async componentDidMount() {
    await this.loadStripe();
  }

  async loadStripe() {
    try {
      const scriptStripe = document.createElement('script');
      scriptStripe.src = 'https://js.stripe.com/v3/';
      scriptStripe.async = true;
      document.body.appendChild(scriptStripe);
      scriptStripe.onload = () => {
        this.setState(() => {
          // @ts-ignore
          return ({ stripe: window.Stripe(STRIPE_PUBLIC) });
        }, () => {
          console.log('STRIPE LOAD');
        });
      };
    } catch (e) {
      console.error(`Error in method loadStripe:`, e);
    }
  }

  onPay = () => {
    let { slug, information, selected_term, selected_instrument, isAuth, onShowModal } = this.props;

    if (!isAuth) {
      onShowModal(MODALS.SIGN_UP);
      return;
    }

    const service_name = slug as SERVICE_NAME;

    if (!information[service_name].prices) {
      return false;
    }

    const selectedInstrumentPrice = information[service_name];
    const selectedPrices = selectedInstrumentPrice.prices[selected_instrument];
    const currentPrices = (isAuth) ? selectedPrices.discount : selectedPrices.standard;
    const price_id = currentPrices[selected_term].id;

    if (!price_id) {
      throw ('Not found price_id');
      return;
    }

    try {
      // @ts-ignore
      this.state.stripe.redirectToCheckout({
        lineItems: [
          { price: price_id, quantity: 1 }
        ],
        mode: 'subscription',
        locale: 'en',
        successUrl: `https://musicabinet.com/pricing?session_id={CHECKOUT_SESSION_ID}&system=${service_name}`,
        cancelUrl: `https://musicabinet.com/pricing`
      });
    } catch (e) {
      console.error(`Error in method handleOnPay : `, e);
    }

  };


  render() {
    const { slug, information, selected_term, selected_instrument, isAuth } = this.props;
    const service_name = slug as SERVICE_NAME;

    if (!information[service_name].prices) {
      return false;
    }

    const selectedInstrumentPrice = information[service_name];
    const selectedPrices = selectedInstrumentPrice.prices[selected_instrument];
    const currentPrices = (isAuth) ? selectedPrices.discount : selectedPrices.standard;
    const currentPeriod = currentPrices[selected_term];

    const current_sum = currentPeriod.current;
    const old_sum = currentPeriod.old;
    const extra = information[service_name].extra;
    const plans = selectedInstrumentPrice.plans;
    const list = selectedInstrumentPrice.list[selected_instrument];


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

        <div className={b('action')}>
          <button onClick={this.onPay}
                  disabled={(!plans.includes(selected_term))}
                  className={b('button', { [slug]: true })}>{(plans.includes(selected_term)) ? 'Buy plan' : 'Unavailable'}
          </button>
        </div>


        <div className={b('list')}>
          {list.map((item: any) => {
            return <div className={b('list-item')}>
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

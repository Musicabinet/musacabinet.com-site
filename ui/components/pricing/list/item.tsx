import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './list.module.sass';
import { ServiceI, TERM_LIST } from '../../../../interfaces';
import { InstrumentIcon } from '../../../common';
import { getIcon, LIST_ICON } from '../../../common/icons';
import { RootStore } from '../../../../stores';

const b = block(style);

type ItemProps = {
  information: any,
  selected_term: TERM_LIST,
  selected_instrument: string
};
type ItemState = {
  stripe: any
};

@inject((store: RootStore) => ({
  information: store.pricingStore.information,
  selected_term: store.pricingStore.selected_term,
  selected_instrument: store.pricingStore.selected_instrument
}))
@observer
export class Item extends React.Component<ItemProps & ServiceI, ItemState> {

  static defaultProps = {
    selected_term: TERM_LIST.MONTHLY,
    selected_instrument: 'guitar'
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
    const { slug, information, selected_term } = this.props;
    const service_name = slug;

    if (information[service_name].prices) {
      const price_id = information[service_name].prices[selected_term].id;
      if (!price_id) {
        throw ('Not found price_id');
        return false;
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
    }


  };


  render() {
    const { slug, information, selected_term, selected_instrument } = this.props;
    const service_name = slug;
    let current = 0;
    let old = 0;
    let list = [];

    if (information[service_name].prices) {
      current = information[service_name]?.prices[selected_term].current;
      old = information[service_name]?.prices[selected_term].old;
      list = information[service_name].list[selected_instrument];
    }

    return (
      <div className={b('item')}>
        <div className={b('icon')}>
          {/*
           // @ts-ignore */}
          <InstrumentIcon icon={service_name.toUpperCase() as LIST_ICON} service={'white'} />
        </div>
        <div className={b('name')}>{slug}</div>
        <div className={b('description')}>{information[service_name].title}</div>
        <div className={b('price')}>$ <span>{current}</span></div>
        <div className={b('old')}>${old}</div>
        <div className={b('action')}>
          <button onClick={this.onPay}
                  className={b('button', { [slug]: true })}>Buy plan
          </button>
        </div>
        <div className={b('list')}>
          {list.map((item: any) => {
            return <div className={b('list-item')}><i
              className={b('check', { [service_name]: true })}>{getIcon(LIST_ICON.CHECK, '')}</i>{item}
            </div>;
          })}
        </div>
      </div>
    );
  }
}

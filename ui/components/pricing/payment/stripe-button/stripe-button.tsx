import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './stripe-button.module.sass';
import { RootStore } from '../../../../../stores';
import { Button } from '../../../../common';
import { getStripePrice, SERVICE_NAME } from '../../../../../constants';

const b = block(style);

type StripeButtonProps = {
  service_name: SERVICE_NAME,
  selected_instrument: string,
  count_month: number
};
type StripeButtonState = {
  stripe: any
};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  selected_instrument: store.pricingStore.selected_instrument,
  count_month: store.pricingStore.countMonth
}))
@observer
export class StripeButton extends React.Component<StripeButtonProps, StripeButtonState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    selected_instrument: '',
    count_month: 0
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

  handleOnPay = () => {

    const { service_name, selected_instrument, count_month } = this.props;

    /*const price_id = (isDev())
      ? 'price_1HqXLMHTf8fYJsx5NT87zyca'
      : getStipePrice(`${service_name}_${selected_instrument}_${count}`);*/

    const price_id = getStripePrice(`${service_name}_${selected_instrument}_${count_month}`);

    if(!price_id){
      throw ('Not found price_id');
      return false;
    }

    try {
      this.state.stripe.redirectToCheckout({
        lineItems: [
          { price: price_id, quantity: 1 }
        ],
        mode: 'subscription',
        locale: 'en',
        successUrl: `${CURRENT_DOMAIN}pricing?session_id={CHECKOUT_SESSION_ID}&system=${service_name}&instrument=${selected_instrument}`,
        cancelUrl: `${CURRENT_DOMAIN}pricing`,
      });
    } catch (e) {
      console.error(`Error in method handleOnPay : `, e);
    }
  };

  render() {

    return (
      <Button full className={b(null)} onClick={this.handleOnPay}>Pay by card</Button>
    );
  }
}

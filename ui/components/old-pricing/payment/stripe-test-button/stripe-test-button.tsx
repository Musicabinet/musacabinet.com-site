import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './stripe-test-button.module.sass';
import { RootStore } from '../../../../../stores';
import { Button } from '../../../../common';
import { SERVICE_NAME } from '../../../../../constants';

const b = block(style);

type StripeTestButtonProps = {
  service_name: SERVICE_NAME,
  selected_instrument: string,
  count_month: number,
  email: string
};
type StripeTestButtonState = {
  stripe: any
};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  selected_instrument: store.pricingStore.selected_instrument,
  count_month: store.pricingStore.countMonth,
  email: store.userStore.email
}))
@observer
export class StripeTestButton extends React.Component<StripeTestButtonProps, StripeTestButtonState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    selected_instrument: '',
    count_month: 0,
    email: ''
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

    const { service_name, selected_instrument, email } = this.props;
    const price_id = 'price_1HpXheHTf8fYJsx5idMLUyeF';

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
        successUrl: `https://musicabinet.com/pricing?session_id={CHECKOUT_SESSION_ID}&system=${service_name}&instrument=${selected_instrument}`,
        cancelUrl: `https://musicabinet.com/pricing`,
        customerEmail: email
      });
    } catch (e) {
      console.error(`Error in method handleOnPay : `, e);
    }
  };

  render() {
    return (
      <Button full className={b(null)} onClick={this.handleOnPay}>TEST Pay by card</Button>
    );
  }
}

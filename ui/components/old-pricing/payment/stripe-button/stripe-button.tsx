import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './stripe-button.module.sass';
import { RootStore } from '../../../../../stores';
import { Button } from '../../../../common';
import { getStripePrice, SERVICE_NAME } from '../../../../../constants';

const b = block(style);

type StripeButtonProps = {
  service_name: SERVICE_NAME;
  selected_instrument: string;
  count_month: number;
  email: string;
};
type StripeButtonState = {
  stripe: any;
};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  selected_instrument: store.pricingStore.selected_instrument,
  count_month: store.pricingStore.countMonth,
  email: store.userStore.email
}))
@observer
export class StripeButton extends React.Component<StripeButtonProps, StripeButtonState> {
  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    selected_instrument: '',
    count_month: 0,
    email: ''
  };

  async componentDidMount() {
    await this.loadStripe();
  }

  async loadStripe() {}

  handleOnPay = () => {
    const { service_name, selected_instrument, count_month, email } = this.props;
    const price_id = getStripePrice(`${service_name}_${selected_instrument}_${count_month}`);

    if (!price_id) {
      throw 'Not found price_id';
      return false;
    }

    try {
      this.state.stripe.redirectToCheckout({
        lineItems: [{ price: price_id, quantity: 1 }],
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
      <Button full className={b(null)} onClick={this.handleOnPay}>
        Pay by card
      </Button>
    );
  }
}

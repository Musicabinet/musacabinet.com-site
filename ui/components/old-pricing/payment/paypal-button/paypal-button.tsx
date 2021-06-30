import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './paypal-button.module.sass';
import { RootStore } from '../../../../../stores';
import { PayPalButton as PayPalModule } from 'react-paypal-button-v2';

const b = block(style);

type PayPalButtonProps = {
  currentPrice: number,
  currencyConverter: number,
  currency: string,
  onGetGeo: () => Promise<void>
};
type PayPalButtonState = {};

@inject((store: RootStore) => ({
  currentPrice: store.pricingStore.price,
  currencyConverter: store.systemStore.currencyConverter,
  currency: store.systemStore.getCurrency,
  onGetGeo: store.systemStore.getGEO,
  generateButtonPayPal: store.pricingStore.generateButtonPayPal
}))
@observer
export class PayPalButton extends React.Component<PayPalButtonProps, PayPalButtonState> {

  static defaultProps = {
    currentPrice: 0,
    currencyConverter: 1,
    currency: 'USD',
    onGetGeo: () => console.log('Not set handler')
  };

  async componentDidMount() {
    const { onGetGeo } = this.props;
    await onGetGeo();
  }

  getPrice = (): number => {
    const { currencyConverter, currentPrice, currency } = this.props;

    if(!currentPrice){
      return 0;
    }

    if (currency === 'RUB') {
      return Number((currentPrice * currencyConverter).toFixed(2));
    } else {
      return Number(currentPrice.toFixed(2));
    }
  };


  render() {
    const { currency } = this.props;

    return (
      <div className={b(null)} data-pay-pal={true}>
        <div className={b('description')}>No recurring payments</div>
        <PayPalModule amount={this.getPrice()}
                      currency={currency}
                      options={{
                        currency: currency,
                        clientId: PAY_PAY_CLIENT_ID
                      }} />
      </div>
    );
  }
}

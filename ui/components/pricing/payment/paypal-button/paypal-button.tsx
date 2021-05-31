import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './paypal-button.module.sass';
import { RootStore } from '../../../../../stores';

const b = block(style);

type PayPalButtonProps = {
  currency: string,
  onGetGeo: () => Promise<void>
};
type PayPalButtonState = {};

@inject((store: RootStore) => ({
  currency: store.systemStore.getCurrency,
  onGetGeo: store.systemStore.getGEO
}))
@observer
export class PayPalButton extends React.Component<PayPalButtonProps, PayPalButtonState> {

  static defaultProps = {
    currency: 'USD',
    onGetGeo: () => console.log('Not set handler')
  };

  async componentDidMount() {
    const { onGetGeo } = this.props;
    await onGetGeo();
  }

  addPayPalScript = async () => {
    const {currency} = this.props;

    return new Promise((resolve, reject) => {
      let payPalScript = document.createElement('script');
      payPalScript.src = `https://www.paypal.com/sdk/js?client-id=${PAY_PAY_CLIENT_ID}&currency=${currency}`;
      payPalScript.addEventListener('load', () => resolve(payPalScript), false);
      payPalScript.addEventListener('error', () => reject(payPalScript), false);

      // Добавляем в тело
      document.body.appendChild(payPalScript);
    });
  };

  render() {
    return (
      <div className={b(null)}>

      </div>
    );
  }
}

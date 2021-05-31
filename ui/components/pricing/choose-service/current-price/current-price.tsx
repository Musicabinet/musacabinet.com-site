import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './current-price.module.sass';
import { RootStore } from '../../../../../stores';

const b = block(style);

type CurrentPriceProps = {
  old_price: number | string,
  price: number | string,
};
type CurrentPriceState = {};

@inject((store: RootStore) => ({
  old_price: store.pricingStore.oldPrice,
  price: store.pricingStore.price
}))
@observer
export class CurrentPrice extends React.Component<CurrentPriceProps, CurrentPriceState> {

  static defaultProps = {
    old_price: '',
    price: ''
  };

  render() {
    const {old_price, price} = this.props;

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className={b(null)}>
              <span className={b('discount')}>{old_price}</span>
              <span className={b('current')}>{price}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

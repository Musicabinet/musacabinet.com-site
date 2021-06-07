import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './count-month.module.sass';
import { RootStore } from '../../../../../stores';
import { PriceI } from '../../../../../interfaces';
import { CountMonthItem } from './item';

const b = block(style);

type CountMonthProps = {
  list: PriceI[],
  month: number
};
type CountMonthState = {};

@inject((store: RootStore) => ({
  list: store.pricingStore.prices,
  month: store.pricingStore.month
}))
@observer
export class CountMonth extends React.Component<CountMonthProps, CountMonthState> {

  static defaultProps = {
    list: [],
    month: 0
  };

  render() {
    const { list, month } = this.props;

    if (list.length === 0) {
      return null;
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className={b(null)}>
              <div className={b('selected', { month })} />
              <div className={b('line')}>
                {list.map((itemPrice, index) => {
                  return (<CountMonthItem key={itemPrice.price}
                                          index={index}
                                          name={itemPrice.name}
                                          price={itemPrice.price}
                                          old_price={itemPrice.old_price}
                                          count_mount={itemPrice.count_mount} />);
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './count-month.module.sass';
import { PriceI } from '../../../../../interfaces';
import { RootStore } from '../../../../../stores';

const b = block(style);

type CountMonthItemProps = {
  index: number;
  onSetMonth: (month: number) => void;
};
type CountMonthItemState = {};

@inject((store: RootStore) => ({
  onSetMonth: store.pricingStore.setMonth
}))
@observer
export class CountMonthItem extends React.Component<CountMonthItemProps & PriceI, CountMonthItemState> {
  static defaultProps = {
    onSetMonth: () => console.log('Not set handler')
  };

  render() {
    const { name, index, onSetMonth } = this.props;

    return (
      <div className={b('dot')} onClick={() => onSetMonth(index)}>
        <div className={b('month', { active: index === 1 })}>{name}</div>
      </div>
    );
  }
}

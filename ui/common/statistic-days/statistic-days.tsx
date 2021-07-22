import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './statistic-days.module.sass';
import Item from './item';

const b = block(style);

type StatisticDaysProps = {};
type StatisticDaysState = {};

@inject(() => ({}))
@observer
export class StatisticDays extends React.Component<StatisticDaysProps, StatisticDaysState> {
  render() {
    return (
      <div className={b(null)}>
        <Item />
      </div>
    );
  }
}

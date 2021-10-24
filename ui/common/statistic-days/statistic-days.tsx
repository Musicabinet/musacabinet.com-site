import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './statistic-days.module.sass';
import Item from './item';
import { InstrumentsStore, RootStore } from '../../../stores';

const b = block(style);

type StatisticDaysProps = {
  instrumentsStore: InstrumentsStore
};
type StatisticDaysState = {};

@inject((store: RootStore) => ({
  instrumentsStore: store.instrumentsStore
}))
@observer
export class StatisticDays extends React.Component<StatisticDaysProps, StatisticDaysState> {

  static defaultProps = {
    instrumentsStore: {}
  };

  render() {
    const { instrumentsStore } = this.props;

    return (
      <div className={b(null)}>
        {instrumentsStore.statistics.map((instrument) => {
          return <Item key={instrument.id} instrument={instrument} />;
        })}

      </div>
    );
  }
}

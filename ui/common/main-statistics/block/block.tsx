import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './block.module.sass';
import { RootStore } from '../../../../stores';
import { StatisticsListStore } from '../../../../stores/statistics-list';

const b = block(style);

type BlockProps = {
  statisticsListStore: StatisticsListStore,
  name: string,
  days: any[],
  month: string
};
type BlockState = {};

@inject((store: RootStore) => ({
  statisticsListStore: store.statisticsListStore
}))
@observer
export class Block extends React.Component<BlockProps, BlockState> {

  static defaultProps = {
    statisticsListStore: {}
  };

  render() {
    const { name, days, month, statisticsListStore } = this.props;


    return (
      <div className={b(null)}>
        <div className={b('month')}>{name}</div>

        <div className={b('list')}>
          {days.map((day, index) => {
            return <div key={index + month}
                        className={b('day', {
                          empty: (day === null),
                          active: statisticsListStore.months.includes(`${month}-${day}`)
                        })} />;
          })}
        </div>
      </div>
    );
  }
}

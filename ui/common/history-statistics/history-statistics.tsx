import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './history-statistics.module.sass';
import { RootStore } from '../../../stores';
import { getIcon, LIST_ICON } from '../icons';
import { StatisticsListStore } from '../../../stores/statistics-list';
import Router from 'next/router';

const b = block(style);

type HistoryStatisticsProps = {
  statisticsListStore: StatisticsListStore
};
type HistoryStatisticsState = {};

@inject((store: RootStore) => ({
  statisticsListStore: store.statisticsListStore
}))
@observer
export class HistoryStatistics extends React.Component<HistoryStatisticsProps, HistoryStatisticsState> {

  static defaultProps = {
    statisticsListStore: {}
  };

  handleOnBack = async () => {
    await Router.push('/cabinet/your-statistics');
  };

  render() {
    const { statisticsListStore } = this.props;

    return (
      <div className={b(null)}>
        <button className={b('btn-back')}
                onClick={this.handleOnBack}>{getIcon(LIST_ICON.BACK, '')}</button>

        <div className={b('header')}>
          <div className={b('title')}>History</div>
        </div>

        <div className={b('current-date')}>
          {statisticsListStore.selected_day && (<span>{statisticsListStore.selected_day.format('MMMM D, YYYY')}</span>)}

        </div>


        <div className={b('notify')}>
          Data is collected...
        </div>

      </div>
    );
  }
}

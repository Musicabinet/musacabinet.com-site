import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './main-statistics.module.sass';
import { Moment } from 'moment';
import { RootStore } from '../../../stores';
import { StatisticsListStore } from '../../../stores/statistics-list';
import { Calendar } from './calendar/calendar';
import { YourStatisticsStore } from '../../../stores/your-statistics';
import { getIcon, LIST_ICON } from '../icons';

const b = block(style);

type MainStatisticsProps = {
  statisticsListStore: StatisticsListStore;
  yourStatisticsStore: YourStatisticsStore;
};
type MainStatisticsState = {};

@inject((store: RootStore) => ({
  statisticsListStore: store.statisticsListStore,
  yourStatisticsStore: store.yourStatisticsStore
}))
@observer
export class MainStatistics extends React.Component<MainStatisticsProps, MainStatisticsState> {

  static defaultProps = {
    statisticsListStore: {},
    yourStatisticsStore: {}
  };

  async componentDidMount() {
    const { statisticsListStore } = this.props;
    await statisticsListStore.getByMonths();
  }

  generate = (currentMoment: Moment) => {
    // Получаем количество дней в текущем месяце
    let countDayInMonth = currentMoment.daysInMonth();
    let startDayInWeek = currentMoment.startOf('month').weekday();
    let completeArr: any = [];


    // Создаем пустые дни если начало недели не с понедельника
    if (startDayInWeek != 1) {
      console.log('startDayInWeek', startDayInWeek);
      //completeArr = Array(startDayInWeek - 1).fill(null).map((i) => i);
    }


    // Формируем массив календаря
    for (let day = 1; day <= countDayInMonth; day++) {
      let prefix: number | string = '';
      if (day < 10) {
        prefix = 0;
      }
      completeArr.push(`${prefix}${day}`);
    }

    return {
      name: `${currentMoment.format('MMM\'YY')}`,
      days: completeArr,
      month: currentMoment.format('YYYY-MM')
    };
  };

  render() {
    const { yourStatisticsStore } = this.props;
    const currentDate = yourStatisticsStore.currentDate.clone();

    return (
      <div className={b(null)}>
        <button className={b('btn', { left: true })}
                onClick={yourStatisticsStore.previousMonth}>{getIcon(LIST_ICON.ARROW_LEFT, b('arrow'))}</button>
        <button className={b('btn', { right: true })}
                onClick={yourStatisticsStore.nextMonth}>{getIcon(LIST_ICON.ARROW_RIGHT, b('arrow'))}</button>

        <div className={b('container')}>
          <div className={b('header')}>Main statistics <span>/ Your overall activity</span></div>

          <div className={b('body')}>
            <Calendar month={currentDate.month()}
                      year={currentDate.format('YY')} />
            <Calendar month={currentDate.add(1, 'month').month()}
                      year={currentDate.format('YY')} />
            <Calendar month={currentDate.add(1, 'month').month()}
                      year={currentDate.format('YY')} last />

          </div>
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import block from 'bem-css-modules';
import style from './calendar.module.sass';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { RootStore } from '../../../../stores';
import Router from 'next/router';
import { StatisticsListStore } from '../../../../stores/statistics-list';

const b = block(style);

type CalendarProps = {
  month: number;
  year: string;
  last: boolean;
  statisticsListStore: StatisticsListStore;
};
type CalendarState = {};

@inject((store: RootStore) => ({
  statisticsListStore: store.statisticsListStore
}))
@observer
export class Calendar extends React.Component<CalendarProps, CalendarState> {

  static defaultProps = {
    last: false,
    statisticsListStore: {}
  };

  isExtraDays = (week: number, date: number) => {
    if (week === 0 && date > 10) {
      return true;
    } else if (week === 5 && date < 10) {
      return true;
    } else if (week === 4 && date < 10) {
      return true;
    } else {
      return false;
    }
  };

  calendarFormation = () => {
    const { year, month } = this.props;

    let calendar = [];
    const startDate = moment([year, month]).clone().startOf('month').startOf('week');
    const endDate = moment([year, month]).clone().endOf('month');
    const day = startDate.clone().subtract(1, 'day');

    while (day.isBefore(endDate, 'day')) {
      calendar.push(
        Array(7).fill(0).map(() => day.add(1, 'day').clone().format('D'))
      );
    }

    return calendar;
  };

  render() {
    const { month, year, last, statisticsListStore } = this.props;
    const currentMonth = month + 1;

    this.calendarFormation();
    return (
      <div className={b(null, { last })}>
        <table>
          <caption>{moment().month(month).format('MMM')} '{year}</caption>
          <thead>
          <tr>
            <th>Su</th>
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
          </tr>
          </thead>
          <tbody>
          {this.calendarFormation().map((week, index) => {
            return <tr key={index}>
              {week.map((day) => {
                const calendarDate = moment(`${day}-${currentMonth}-${year}`, 'D-M-YY').format('YYYY-MM-DD');
                const isLearning = statisticsListStore.months.includes(calendarDate);

                return <td key={day} className={b('day', { isLearning })} onClick={async () => {
                  if (!isLearning) {
                    return false;
                  }

                  await Router.push(`/cabinet/your-statistics/history/${calendarDate}`);

                }}>{this.isExtraDays(index, +day) ? null : day}</td>;
              })}
            </tr>;
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

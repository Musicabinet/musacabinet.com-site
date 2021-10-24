import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './main-statistics.module.sass';
import moment from 'moment';

const b = block(style);

type MainStatisticsProps = {};
type MainStatisticsState = {};

@inject(() => ({}))
@observer
export class MainStatistics extends React.Component<MainStatisticsProps, MainStatisticsState> {

  generate = () => {
    let calendar: any[] = [];
    const today = moment();
    const startDay = today.clone().startOf('month').startOf('week');
    const endDay = today.clone().startOf('month').endOf('week');

    let date = startDay.clone().subtract(1, 'day');

    while (date.isBefore(endDay, 'day'))
      calendar.push({
        days: Array(7).fill(0).map(() => date.add(1, 'day').clone())
      });

    console.log(calendar);
  };

  render() {

    this.generate();

    return (
      <div className={b(null)}>

        <div className={b('container')}>
          <div className={b('header')}>Main statistics</div>
          <div className={b('text')}>Your overall activity</div>
        </div>

      </div>
    );
  }
}

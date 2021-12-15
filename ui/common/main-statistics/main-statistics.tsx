import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './main-statistics.module.sass';
import moment, { Moment } from 'moment';
import { Block } from './block/block';
import { RootStore } from '../../../stores';
import { StatisticsListStore } from '../../../stores/statistics-list';

const b = block(style);

type MainStatisticsProps = {
  statisticsListStore: StatisticsListStore
};
type MainStatisticsState = {};

@inject((store: RootStore) => ({
  statisticsListStore: store.statisticsListStore
}))
@observer
export class MainStatistics extends React.Component<MainStatisticsProps, MainStatisticsState> {

  static defaultProps = {
    statisticsListStore: {}
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
      completeArr = Array(startDayInWeek - 1).fill(null).map((i) => i);
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
    return (
      <div className={b(null)}>

        <div className={b('container')}>
          <div className={b('header')}>Main statistics</div>
          <div className={b('text')}>Your overall activity</div>

          <div className='row'>
            <div className='col-xxl-3 position-relative'>
              <div className={b('name-week')}>
                <div>Mon</div>
                <div>Sun</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              <Block {...this.generate(moment())} />
            </div>
            <div className='col-xxl-3'>
              <Block {...this.generate(moment().add(1, 'month'))} />
            </div>
            <div className='col-xxl-3'>
              <Block {...this.generate(moment().add(2, 'month'))} />
            </div>
            <div className='col-xxl-3'>
              <Block {...this.generate(moment().add(3, 'month'))} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

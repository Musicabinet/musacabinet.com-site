import * as React from 'react';
import block from 'bem-css-modules';
import style from './calendar.module.sass';
import moment from 'moment';

const b = block(style);

type CalendarProps = {
  month: number;
  year: string;
  last: boolean;
};
type CalendarState = {};

export class Calendar extends React.Component<CalendarProps, CalendarState> {

  static defaultProps = {
    last: false
  }

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
    const { month, year, last } = this.props;
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
          {this.calendarFormation().map((week, index)=>{
            return <tr key={index}>
              {week.map((day)=>{
                return <td key={day}>{this.isExtraDays(index, +day) ? null : day}</td>
              })}
            </tr>
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

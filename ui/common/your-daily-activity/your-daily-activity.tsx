import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './your-daily-activity.module.sass';
import { LessonProgressMonthStore, RootStore } from '../../../stores';
import { getIcon, LIST_ICON } from '../icons';

const b = block(style);

type YourDailyActivityProps = {
  lessonProgressMonthStore: LessonProgressMonthStore
};
type YourDailyActivityState = {};

@inject((store: RootStore) => ({
  lessonProgressMonthStore: store.lessonProgressMonthStore
}))
@observer
export class YourDailyActivity extends React.Component<YourDailyActivityProps, YourDailyActivityState> {

  static defaultProps = {
    lessonProgressMonthStore: {}
  };

  async componentDidMount() {
    const { lessonProgressMonthStore } = this.props;
    await lessonProgressMonthStore.getList();
  }

  generateStatistics = (): React.ReactNode => {
    const { lessonProgressMonthStore } = this.props;
    let completeData: React.ReactNode[] = [];

    for (let i = 1; i <= lessonProgressMonthStore.current_date.daysInMonth(); i++) {
      completeData.push(<div className={b('item')}>
        <div className={b('day')}>{i}</div>
      </div>);
    }

    return completeData;
  };

  render() {
    const { lessonProgressMonthStore } = this.props;

    console.log(lessonProgressMonthStore.map);

    return (
      <div className={b(null)}>
        <button className={b('btn', { left: true })}
                onClick={lessonProgressMonthStore.previousMonth}>{getIcon(LIST_ICON.ARROW_LEFT, b('arrow'))}</button>
        <button className={b('btn', { right: true })}
                onClick={lessonProgressMonthStore.nextMonth}>{getIcon(LIST_ICON.ARROW_RIGHT, b('arrow'))}</button>

        <div className={b('container')}>
          <div className={b('header')}>Main statistics <span>/ Your daily activity in hours</span></div>

          <div className={b('body')}>
            <div className={b('nameMonth')}>{lessonProgressMonthStore.currentMonthYear}</div>

            <div className={b('statistics')}>
              {this.generateStatistics()}
            </div>
          </div>

        </div>

      </div>
    );
  }
}

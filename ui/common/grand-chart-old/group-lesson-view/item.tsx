import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lesson-view.module.sass';
import { GrandChartStore, GroupLessonStore, RootStore, SystemStore } from '../../../../stores';
import * as moment from 'moment';
import { Lessons } from './lessons/lessons';
import { getIcon, LIST_ICON } from '../../icons';
import { StatisticsListStore } from '../../../../stores/statistics-list';
import { getTimeFromMin } from '../../../../helpers';

const b = block(style);

type GroupLessonViewItemProps = {
  isShowTrial: boolean;
  isFirst: boolean;
  groupLesson: GroupLessonStore;

  systemStore: SystemStore;
  grandChartStore: GrandChartStore;
  statisticsListStore: StatisticsListStore;
};
type GroupLessonViewItemState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  grandChartStore: store.grandChartStore,
  statisticsListStore: store.statisticsListStore
}))
@observer
export class GroupLessonViewItem extends React.Component<GroupLessonViewItemProps, GroupLessonViewItemState> {

  static defaultProps = {
    systemStore: {},
    grandChartStore: {},
    statisticsListStore: {}
  };

  handleOnBack = () => {
    const { grandChartStore } = this.props;
    grandChartStore.setShowGroupLessonDetail(false);
  };

  totalCountHour = () => {
    const { groupLesson } = this.props;
    let total_minute = 0;

    groupLesson.lessons.forEach((lesson) => {
      total_minute += lesson.duration_minute;
    });

    return moment.utc().startOf('day').add({ minutes: total_minute }).format('H:mm');
  };

  getDataStatistics(): { passedData: string, passedPercent: number, totalData: string } {
    const { statisticsListStore, groupLesson } = this.props;

    if (!statisticsListStore.list[groupLesson.course_id] && !Array.isArray(statisticsListStore.list[groupLesson.course_id])) {
      return {
        passedData: '0:00',
        passedPercent: 0,
        totalData: '0:00',
      };
    }
    // Получить общее кол-во минут уроков
    let totalMinutes = 0;
    let passedMinutes = 0;

    statisticsListStore.list[groupLesson.course_id].forEach((staticLessonsProgress) => {
      if (staticLessonsProgress.collection_id === groupLesson.collection_id) {
        staticLessonsProgress.lessons.forEach((lesson) => {
          totalMinutes += lesson.duration_minute;
          passedMinutes += lesson.total_progress_minute >= lesson.duration_minute
            ? lesson.duration_minute
            : lesson.total_progress_minute;
        });
      }
    });

    return {
      passedData: getTimeFromMin(passedMinutes),
      totalData: getTimeFromMin(totalMinutes),
      passedPercent: Math.ceil((passedMinutes * 100) / totalMinutes)
    };
  }

  render() {
    const { groupLesson, isFirst, systemStore, isShowTrial } = this.props;
    const { passedData, passedPercent, totalData } = this.getDataStatistics();

    return (
      <div
        className={b('item', {
          [systemStore.service_name]: true
        })}
      >
        <div className={b('back', { show: isFirst })} onClick={this.handleOnBack}>
          {getIcon(LIST_ICON.BACK, '')}
        </div>

        <div className={b('body')}>
          <div className={b('title')}>{groupLesson.name}</div>
          <div className={b('progress')}>
            <div className={b('total-percent')}>{passedPercent}%</div>

            <div className={b('line')}>
              <div className={b('line-progress')} style={{ width: `${passedPercent}%` }} />
            </div>

            <div className={b('statistic')}>
              <div className={b('block')}>
                <div className={b('text')}>
                  Hours
                  <br />
                  passed
                </div>
                <div className={b('time')}>{passedData}</div>
              </div>
              <div className={b('block')}>
                <div className={b('text')}>
                  Hours
                  <br />
                  remain
                </div>
                <div className={b('time', { remain: true })}>{totalData}</div>
              </div>
            </div>
          </div>
        </div>

        <Lessons list={groupLesson.lessons} isShowTrial={isShowTrial} />
      </div>
    );
  }
}

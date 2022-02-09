import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lesson-view.module.sass';
import { GrandChartFlatStore, GroupLessonStore } from '../../../../stores';
import { getTimeFromMin } from '../../../../helpers';
import { getIcon, LIST_ICON } from '../../icons';
import { Lessons } from './lessons/lessons';
import { SERVICE_NAME } from '../../../../constants';

const b = block(style);

type GroupLessonViewDetailProps = {
  serviceName: SERVICE_NAME;
  grandChartStore: GrandChartFlatStore;
  groupLessonDetail: GroupLessonStore;
  isFirst: boolean;
  isShowTrial: boolean;
};
type GroupLessonViewDetailState = {};

@inject(() => ({
}))
@observer
export class GroupLessonViewDetail extends React.Component<GroupLessonViewDetailProps, GroupLessonViewDetailState> {

  static defaultProps = {
    systemStore: {}
  };

  handleOnBack = (e: React.MouseEvent<HTMLDivElement>) => {
    const { grandChartStore } = this.props;
    grandChartStore.setShowGroupLessonDetail(false);
    e.stopPropagation();
    e.preventDefault();
  };

  getDataStatistics(): { passedData: string, passedPercent: number, totalData: string } {
    const { groupLessonDetail, grandChartStore } = this.props;


    if (!grandChartStore.statistics.list[grandChartStore.selected_course_id] && !Array.isArray(grandChartStore.statistics.list[grandChartStore.selected_course_id])) {
      return {
        passedData: '0:00',
        passedPercent: 0,
        totalData: '0:00'
      };
    }
    // Получить общее кол-во минут уроков
    let totalMinutes = 0;
    let passedMinutes = 0;

    grandChartStore.statistics.list[grandChartStore.selected_course_id].forEach((staticLessonsProgress) => {
      if (staticLessonsProgress.collection_id === groupLessonDetail.collection_id) {
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
    const { groupLessonDetail, serviceName, isFirst, isShowTrial, grandChartStore } = this.props;
    const { passedData, passedPercent, totalData } = this.getDataStatistics();

    return <div className={b('item', {
      [serviceName]: true
    })}>

      <div className={b('back', { show: isFirst })} onClick={this.handleOnBack}>
        {getIcon(LIST_ICON.BACK, '')}
      </div>

      <div className={b('body')}>
        <div className={b('title')}>{groupLessonDetail.name}</div>
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

      <Lessons lessons={groupLessonDetail.lessons}
               grandChartStore={grandChartStore}
               isShowTrial={isShowTrial} />
    </div>;
  }
}

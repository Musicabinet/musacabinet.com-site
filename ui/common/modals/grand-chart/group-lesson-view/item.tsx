import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lesson-view.module.sass';
import { RootStore } from '../../../../../stores';
import { GroupLessonI } from '../../../../../interfaces/group-lesson';
import { SERVICE_NAME } from '../../../../../constants';
import * as moment from "moment"
import { Lessons } from './lessons/lessons';

const b = block(style);

type GroupLessonViewItemProps = {
  isFirst: boolean,
  service_name: SERVICE_NAME,
  onSetShowGroupLessonDetail: (show: boolean) => void,
};
type GroupLessonViewItemState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  onSetShowGroupLessonDetail: store.grandChartStore.setShowGroupLessonDetail
}))
@observer
export class GroupLessonViewItem extends React.Component<GroupLessonViewItemProps & GroupLessonI, GroupLessonViewItemState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    onSetShowGroupLessonDetail: () => console.log('Not set handler')
  };

  handleOnBack = () => {
    const { onSetShowGroupLessonDetail } = this.props;
    onSetShowGroupLessonDetail(false);
  };

  totalCountHour = () => {
    const { lessons } = this.props;
    let total_minute = 0;

    lessons.forEach((lesson) => {
      total_minute += lesson.duration_minute;
    });

    return moment.utc().startOf('day').add({ minutes: total_minute }).format('H:mm');
  };

  render() {
    const { isFirst, service_name, name, lessons } = this.props;

    return (
      <div className={b('item', {
        [service_name]: true
      })}>
        <div className={b('back', { show: isFirst })}
             onClick={this.handleOnBack}>

        </div>

        <div className={b('body')}>
          <div className={b('title')}>{name}</div>
          <div className={b('progress')}>
            <div className={b('total-percent')}>0%</div>
            <div className={b('line')} />
            <div className={b('statistic')}>
              <div className={b('block')}>
                <div className={b('text')}>
                  Hours<br />
                  passed
                </div>
                <div className={b('time')}>
                  0:00
                </div>
              </div>
              <div className={b('block')}>
                <div className={b('text')}>
                  Hours<br />
                  remain
                </div>
                <div className={b('time', { remain: true })}>
                  {this.totalCountHour()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Lessons list={lessons} />
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './courses.module.sass';
import { CourseStore } from '../../../../stores/course';
import { AuthStore, GrandChartStore, RootStore, SystemStore, UserStore } from '../../../../stores';
import { Pie } from '../pie/pie';
import { StatisticsListStore } from '../../../../stores/statistics-list';

const b = block(style);

type CourseItemProps = {
  course: CourseStore,
  systemStore: SystemStore,
  statisticsListStore: StatisticsListStore,
  grandChartStore: GrandChartStore,
  authStore: AuthStore,
  userStore: UserStore
};
type CourseItemState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  statisticsListStore: store.statisticsListStore,
  grandChartStore: store.grandChartStore,
  authStore: store.authStore,
  userStore: store.userStore
}))
@observer
export class CourseItem extends React.Component<CourseItemProps, CourseItemState> {

  public circle = React.createRef<SVGCircleElement>();
  public circleFill = React.createRef<SVGCircleElement>();

  static defaultProps = {
    systemStore: {},
    statisticsListStore: {},
    grandChartStore: {},
    authStore: {},
    userStore: {}
  };

  getPassedPercent(): number {
    const { course, statisticsListStore, grandChartStore } = this.props;
    const passedMinute = statisticsListStore.getCoursesPassedTotal[course.id] || 0;
    return Math.ceil((passedMinute * 100) / grandChartStore.totalTimeCollections[course.id]);
  }

  fillCirclePercent = () => {
    if (this.circle && this.circle.current) {
      this.circle.current.style.strokeDasharray = `${Math.ceil(this.getPassedPercent())} 113`;
    }
  };

  render() {
    const { course, systemStore } = this.props;
    this.fillCirclePercent();

    return (
      <div className={b('item', {
        [systemStore.service_name]: true
      })}>
        <div className={b('toolbar')}>
          {course.courseNumber}
        </div>
        {course.name}

        <div className={b('pie')}>
          <Pie id={course.id}
               percent={this.getPassedPercent()}
               circle={this.circle}
               circleFill={this.circleFill}
               classCircle={b('circle').toString()} />
        </div>
      </div>
    );
  }
}

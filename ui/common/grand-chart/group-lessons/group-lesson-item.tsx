import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lessons.module.sass';
import { AuthStore, GrandChartStore, GroupLessonStore, RootStore, SystemStore, UserStore } from '../../../../stores';
import { StatisticsListStore } from '../../../../stores/statistics-list';

const b = block(style);

type GroupLessonItemProps = {
  isTrialShow: boolean,
  groupLesson: GroupLessonStore,

  authStore: AuthStore,
  systemStore: SystemStore,
  userStore: UserStore,
  grandChart: GrandChartStore,
  statisticsListStore: StatisticsListStore
};
type GroupLessonItemState = {};

@inject((store: RootStore) => ({
  authStore: store.authStore,
  systemStore: store.systemStore,
  userStore: store.userStore,
  grandChart: store.grandChartStore,
  statisticsListStore: store.statisticsListStore
}))
@observer
export class GroupLessonItem extends React.Component<GroupLessonItemProps, GroupLessonItemState> {

  static defaultProps = {
    authStore: {},
    systemStore: {},
    userStore: {},
    grandChart: {},
    statisticsListStore: {}
  };

  handleOnShow = () => {
    const { isTrialShow, userStore, systemStore, authStore, grandChart } = this.props;
    const isPurchaseUser = userStore.checkSubscription(systemStore.service_id, systemStore.instrument_id);

    if (isPurchaseUser.length === 0 && !isTrialShow || !authStore.isAuth) {
      return false;
    }

    if (Array.isArray(isPurchaseUser) && isPurchaseUser[0] && isPurchaseUser[0].isExpired) {
      return false;
    }

    const { groupLesson } = this.props;

    if (groupLesson.collection_id) {
      systemStore.setCollectionId(groupLesson.collection_id);
    }

    systemStore.setCourseId(groupLesson.course_id);
    systemStore.setModuleId(groupLesson.module_id);
    systemStore.setGroupLessonId(groupLesson.id);
    grandChart.setDetailGroupLesson(groupLesson);
    grandChart.setShowGroupLessonDetail();
  };

  getPercent(): number {
    const { statisticsListStore, groupLesson } = this.props;

    if (!statisticsListStore.list[groupLesson.course_id] && !Array.isArray(statisticsListStore.list[groupLesson.course_id])) {
      return 0;
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

    return Math.ceil((passedMinutes * 100) / totalMinutes);
  }

  render() {
    const { groupLesson, systemStore, userStore, authStore, isTrialShow } = this.props;
    const isPurchaseUser = userStore.checkSubscription(systemStore.service_id, systemStore.instrument_id);

    if (!systemStore.service_name) {
      return null;
    }

    return (
      <div onClick={this.handleOnShow}
           className={b('item', {
             [`active-${systemStore.service_name}`]: systemStore.selected_group_lesson_id === groupLesson.id,
             [`trial-blocked`]: isPurchaseUser.length > 0 ? isPurchaseUser[0].isExpired : !isTrialShow || !authStore.isAuth
           })}>
        <div className={b('name')}>{groupLesson.name}</div>
        <div className={b('progress')} style={{ width: `${this.getPercent()}%` }} />
      </div>
    );
  }
}

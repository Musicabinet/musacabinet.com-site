import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lessons.module.sass';
import { AuthStore, GrandChartFlatStore, GroupLessonStore, RootStore, UserStore } from '../../../../stores';
import { SERVICE_ID, SERVICE_NAME } from '../../../../constants';

const b = block(style);

type GroupLessonItemProps = {
  isTrialShow: boolean;
  service_id: SERVICE_ID;
  instrument_id: number;
  groupLesson: GroupLessonStore;
  serviceName: SERVICE_NAME;
  grandChartStore: GrandChartFlatStore;

  authStore: AuthStore;
  userStore: UserStore;
};
type GroupLessonItemState = {};

@inject((store: RootStore) => ({
  authStore: store.authStore,
  userStore: store.userStore
}))
@observer
export class GroupLessonItem extends React.Component<GroupLessonItemProps, GroupLessonItemState> {

  static defaultProps = {
    authStore: {},
    userStore: {}
  };

  handleOnShow = () => {
    const { isTrialShow, userStore, authStore, service_id, instrument_id, grandChartStore, groupLesson } = this.props;
    const isPurchaseUser = userStore.checkSubscription(service_id, instrument_id);

    if (isPurchaseUser.length === 0 && !isTrialShow || !authStore.isAuth) {
      return false;
    }

    if (Array.isArray(isPurchaseUser) && isPurchaseUser[0] && isPurchaseUser[0].isExpired) {
      return false;
    }

    // Записываем выбранную группу урока
    grandChartStore.setCourseId(groupLesson.course_id);
    grandChartStore.setModuleId(groupLesson.module_id);
    grandChartStore.setGroupLessonId(groupLesson.id);
    grandChartStore.setShowGroupLessonDetail(true);

    // Находим текущий гранд чарт
    const findGrandChart = document.querySelector('[data-grand-chart-show=\'true\']');

    if (findGrandChart) {
      findGrandChart.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  getPercent(): number {
    const { grandChartStore, groupLesson } = this.props;

    if (!grandChartStore.statistics.list[groupLesson.course_id] && !Array.isArray(grandChartStore.statistics.list[groupLesson.course_id])) {
      return 0;
    }
    // Получить общее кол-во минут уроков
    let totalMinutes = 0;
    let passedMinutes = 0;

    grandChartStore.statistics.list[groupLesson.course_id].forEach((staticLessonsProgress) => {
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
    const {
      groupLesson,
      userStore,
      authStore,
      isTrialShow,
      service_id,
      instrument_id,
      grandChartStore,
      serviceName
    } = this.props;
    const isPurchaseUser = userStore.checkSubscription(service_id, instrument_id);

    return (
      <div onClick={this.handleOnShow}
           className={b('item', {
             [`active-${serviceName}`]: grandChartStore.selected_group_lesson_id === groupLesson.id,
             [`trial-blocked`]: isPurchaseUser.length > 0 ? isPurchaseUser[0].isExpired : !isTrialShow || !authStore.isAuth
           })}>
        <div className={b('name')}>{groupLesson.name}</div>
        <div className={b('progress')} style={{ width: `${this.getPercent()}%` }} />
      </div>
    );
  }
}

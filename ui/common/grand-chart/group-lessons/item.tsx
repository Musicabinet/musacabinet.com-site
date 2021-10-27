import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lessons.module.sass';
import { GrandChartStore, RootStore, UserStore, SystemStore, AuthStore, GroupLessonStore } from '../../../../stores';

const b = block(style);

type GroupLessonItemProps = {
  isTrialShow: boolean,
  groupLesson: GroupLessonStore,

  authStore: AuthStore,
  systemStore: SystemStore,
  userStore: UserStore,
  grandChart: GrandChartStore,
};
type GroupLessonItemState = {};

@inject((store: RootStore) => ({
  authStore: store.authStore,
  systemStore: store.systemStore,
  userStore: store.userStore,
  grandChart: store.grandChartStore
}))
@observer
export class GroupLessonItem extends React.Component<GroupLessonItemProps, GroupLessonItemState> {
  static defaultProps = {
    authStore: {},
    systemStore: {},
    userStore: {},
    grandChart: {}
  };

  handleOnClick = () => {
    const { isTrialShow, userStore, systemStore, authStore, grandChart } = this.props;
    const isPurchaseUser = userStore.checkSubscription(systemStore.service_id, systemStore.instrument_id);

   // console.log('is trial false', isTrialShow);
    console.log('isPurchaseUser', isPurchaseUser.length === 0 && !isTrialShow || !authStore.isAuth);

    if(isPurchaseUser.length === 0 && !isTrialShow || !authStore.isAuth){
      return false;
    }

    /*if ((isPurchaseUser.length === 0 && !isTrialShow) || (!isTrialShow) && !authStore.isAuth) {
      return false;
    }*/

    const { groupLesson } = this.props;

    if (groupLesson.collection_id) {
      systemStore.setCollectionId(groupLesson.collection_id);
    }

    systemStore.setCourseId(groupLesson.course_id);
    systemStore.setModuleId(groupLesson.module_id);
    systemStore.setGroupLessonId(groupLesson.id);
    grandChart.setShowGroupLessonDetail();
  };

  render() {
    const {
      groupLesson,
      userStore,
      systemStore,
      authStore,
      isTrialShow
    } = this.props;
    const isPurchaseUser = userStore.checkSubscription(systemStore.service_id, systemStore.instrument_id);

    if (!systemStore.service_name) {
      return null;
    }

    return (
      <div
        onClick={this.handleOnClick}
        className={b('item', {
          [systemStore.service_name]: true,
          [`active-${systemStore.service_name}`]: systemStore.selected_group_lesson_id === groupLesson.id,
          [`trial-blocked`]: isPurchaseUser.length > 0 ? false : !isTrialShow || !authStore.isAuth
        })}
      >
        <div className={b('title')}
             dangerouslySetInnerHTML={{ __html: groupLesson.name.replace(/\(/g, '<br/>(') }} />
      </div>
    );
  }
}

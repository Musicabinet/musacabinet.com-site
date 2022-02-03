import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lesson-view.module.sass';
import { GrandChartStore, RootStore, SystemStore, UserStore } from '../../../../stores';
import { GroupLessonViewDetail } from './group-lesson-view-detail';

const b = block(style);

type GroupLessonViewProps = {
  userStore: UserStore,
  grandChartStore: GrandChartStore,
  systemStore: SystemStore
};
type GroupLessonViewState = {};

@inject((store: RootStore) => ({
  userStore: store.userStore,
  grandChartStore: store.grandChartStore,
  systemStore: store.systemStore
}))
@observer
export class GroupLessonView extends React.Component<GroupLessonViewProps, GroupLessonViewState> {

  static defaultProps = {
    userStore: {},
    grandChartStore: {},
    systemStore: {}
  };

  componentWillUnmount() {
    const { grandChartStore } = this.props;
    grandChartStore.setShowGroupLessonDetail(false);
  }

  render() {
    const { grandChartStore, userStore } = this.props;
    const groupLessonDetail = grandChartStore.groupLessonDetail;
    let i = 0;

    if (!grandChartStore.showGroupLessonDetail) {
      return null;
    }

    return (
      <div className={b(null)}>
        {groupLessonDetail.map((groupLesson, index) => {
          i++;
          return <GroupLessonViewDetail key={groupLesson.id}
                                        groupLessonDetail={groupLesson}
                                        isFirst={i === 1}
                                        isShowTrial={index === 0 && userStore.trial_version.is_valid}/>;
        })}
      </div>
    );
  }

}

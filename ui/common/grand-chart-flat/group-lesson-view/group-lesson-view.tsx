import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lesson-view.module.sass';
import { GrandChartFlatStore, RootStore, SystemStore, UserStore } from '../../../../stores';
import { GroupLessonViewDetail } from './group-lesson-view-detail';
import { SERVICE_NAME } from '../../../../constants';

const b = block(style);

type GroupLessonViewProps = {
  serviceName: SERVICE_NAME;
  userStore: UserStore,
  grandChartStore: GrandChartFlatStore,
  systemStore: SystemStore
};
type GroupLessonViewState = {};

@inject((store: RootStore) => ({
  userStore: store.userStore,
  systemStore: store.systemStore
}))
@observer
export class GroupLessonView extends React.Component<GroupLessonViewProps, GroupLessonViewState> {

  static defaultProps = {
    userStore: {},
    systemStore: {}
  };

  componentWillUnmount() {
    //const { grandChartStore } = this.props;
    //grandChartStore.setShowGroupLessonDetail();
  }

  render() {
    const { grandChartStore, userStore, serviceName } = this.props;
    let i = 0;

    if (!grandChartStore.isShowGroupLessonDetail) {
      return null;
    }

    const groupLessonDetail = grandChartStore.groupLessonDetail;

    return (
      <div className={b(null)}>
        {groupLessonDetail.map((groupLesson, index) => {
          i++;
          return <GroupLessonViewDetail key={groupLesson.id}
                                        groupLessonDetail={groupLesson}
                                        serviceName={serviceName}
                                        grandChartStore={grandChartStore}
                                        isFirst={i === 1}
                                        isShowTrial={index === 0 && userStore.trial_version.is_valid}/>;
        })}
      </div>
    );
  }

}

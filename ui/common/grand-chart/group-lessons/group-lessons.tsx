import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lessons.module.sass';
import { GrandChartStore, RootStore, SystemStore, UserStore } from '../../../../stores';
import { GroupLessonItem } from './group-lesson-item';
import { GroupLessonView } from '../group-lesson-view/group-lesson-view';

const b = block(style);

type GroupLessonsProps = {
  grandChartStore: GrandChartStore,
  userStore: UserStore,
  systemStore: SystemStore
};
type GroupLessonsState = {};

@inject((store: RootStore) => ({
  grandChartStore: store.grandChartStore,
  userStore: store.userStore,
  systemStore: store.systemStore
}))
@observer
export class GroupLessons extends React.Component<GroupLessonsProps, GroupLessonsState> {

  static defaultProps = {
    grandChartStore: {},
    userStore: {},
    systemStore: {}
  };

  render() {
    const { grandChartStore, userStore, systemStore } = this.props;

    return (
      <div className={b(null, {
        [systemStore.service_name]: true
      })}
           style={{
             gridTemplateColumns: `repeat(${grandChartStore.modules.length}, 220px)`,
             gridTemplateRows: `repeat(${grandChartStore.courses.length}, 170px)`
           }}>
        {grandChartStore.groupLessons.map((groupLessonsGroup) => {
          return groupLessonsGroup.map((groupLessonStore) => {
            return <GroupLessonItem key={groupLessonStore.id}
                                    groupLesson={groupLessonStore}
                                    isTrialShow={userStore.trial_version.is_valid} />;
          });
        })}

        <GroupLessonView />
      </div>
    );
  }

}

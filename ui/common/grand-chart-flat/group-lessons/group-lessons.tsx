import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lessons.module.sass';
import { GrandChartFlatStore, RootStore, UserStore } from '../../../../stores';
import { GroupLessonItem } from './group-lesson-item';
import { SERVICE_ID, SERVICE_NAME } from '../../../../constants';
import { GroupLessonView } from '../group-lesson-view/group-lesson-view';

const b = block(style);

type GroupLessonsProps = {
  serviceName: SERVICE_NAME;
  service_id: SERVICE_ID;
  instrument_id: number;
  grandChartStore: GrandChartFlatStore;
  userStore: UserStore;
};
type GroupLessonsState = {};

@inject((store: RootStore) => ({
  userStore: store.userStore
}))
@observer
export class GroupLessons extends React.Component<GroupLessonsProps, GroupLessonsState> {

  static defaultProps = {
    userStore: {}
  };

  render() {
    const { grandChartStore, userStore, serviceName, service_id, instrument_id } = this.props;


    return (
      <div className={b(null, { [serviceName]: true })}
           style={{
             gridTemplateColumns: `repeat(${grandChartStore.modules.length}, 220px)`,
             gridTemplateRows: `repeat(${grandChartStore.courses.length}, 170px)`
           }}>
        {grandChartStore.groupLessons.map((groupLessonsGroup, index) => {
          if (groupLessonsGroup.length > 1) {
            return <div key={index}
                        className={b('container')}>
              {groupLessonsGroup.map((groupLessonStore) => {
                return <GroupLessonItem key={groupLessonStore.id}
                                        serviceName={serviceName}
                                        service_id={service_id}
                                        instrument_id={instrument_id}
                                        groupLesson={groupLessonStore}
                                        grandChartStore={grandChartStore}
                                        isTrialShow={userStore.trial_version.is_valid} />;
              })}
            </div>;
          } else {
            return groupLessonsGroup.map((groupLessonStore) => {
              return <GroupLessonItem key={groupLessonStore.id}
                                      serviceName={serviceName}
                                      service_id={service_id}
                                      instrument_id={instrument_id}
                                      groupLesson={groupLessonStore}
                                      grandChartStore={grandChartStore}
                                      isTrialShow={userStore.trial_version.is_valid} />;
            });
          }


        })}

        <GroupLessonView grandChartStore={grandChartStore} serviceName={serviceName} />
      </div>
    );
  }

}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lessons.module.sass';
import { GrandChartStore, RootStore, UserStore } from '../../../../stores';
import { GroupLessonsFinal } from '../../../../interfaces';
import { GroupLessonItem } from './item';

const b = block(style);

type GroupLessonsProps = {
  userStore: UserStore,
  grandChartStore: GrandChartStore,
  list: GroupLessonsFinal;
};
type GroupLessonsState = {};

@inject((store: RootStore) => ({
  userStore: store.userStore,
  grandChartStore: store.grandChartStore,
  list: store.grandChartStore.finalData
}))
@observer
export class GroupLessons extends React.Component<GroupLessonsProps, GroupLessonsState> {
  static defaultProps = {
    userStore: {},
    grandChartStore: {},
    list: {}
  };

  getGroupLessons = (course_module_id: string) => {
    const { list } = this.props;
    return list[course_module_id] || [];
  };

  render() {
    const { userStore, grandChartStore } = this.props;
    let row = 0;

    return (
      <div
        className={b(null)}
        style={{
          width: `${grandChartStore.modules.length * 230}px`
        }}
      >
        {grandChartStore.courses.map((course) => {
          row++;
          return grandChartStore.modules.map((module) => {
            return (
              <div key={module.id} className={b('block')}>
                {this.getGroupLessons(`${course.id}-${module.id}`).map((group_lesson) => {
                  return (
                    <GroupLessonItem key={group_lesson.id}
                                     groupLesson={group_lesson}
                                     isTrialShow={row === 1 && userStore.trial_version.is_valid} />
                  );
                })}
              </div>
            );
          });
        })}
      </div>
    );
  }
}

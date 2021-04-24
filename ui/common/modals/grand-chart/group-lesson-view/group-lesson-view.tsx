import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lesson-view.module.sass';
import { RootStore } from '../../../../../stores';
import { GroupLessonI } from '../../../../../interfaces/group-lesson';
import { GroupLessonViewItem } from './item';

const b = block(style);

type GroupLessonViewProps = {
  show: boolean,
  list: GroupLessonI[]
};
type GroupLessonViewState = {};

@inject((store: RootStore) => ({
  show: store.grandChartStore.showGroupLessonDetail,
  list: store.grandChartStore.groupLessonDetail
}))
@observer
export class GroupLessonView extends React.Component<GroupLessonViewProps, GroupLessonViewState> {

  static defaultProps = {
    show: false,
    list: []
  };

  render() {
    const { show, list } = this.props;

    if (!show) {
      return false;
    }

    return (
      <div className={b(null)}>
        {list.map((groupLesson, index) => {
          return (
            <GroupLessonViewItem key={groupLesson.id}
                                 isFirst={index === 0}
                                 id={groupLesson.id}
                                 name={groupLesson.name}
                                 collection_id={groupLesson.collection_id}
                                 module_id={groupLesson.module_id}
                                 course_id={groupLesson.course_id}
                                 total_lessons={groupLesson.total_lessons}
                                 lessons={groupLesson.lessons} />
          );
        })}
      </div>
    );
  }

}

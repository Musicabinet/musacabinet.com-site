import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lesson-view.module.sass';
import { RootStore } from '../../../../stores';
import { GroupLessonI } from '../../../../interfaces';
import { GroupLessonViewItem } from './item';

const b = block(style);

type GroupLessonViewProps = {
  isTrialValid: boolean,
  show: boolean,
  list: GroupLessonI[],
  setShowGroupLessonDetail: (show: boolean) => void
};
type GroupLessonViewState = {};

@inject((store: RootStore) => ({
  isTrialValid: store.userStore.trial_version.isValid,
  show: store.grandChartStore.showGroupLessonDetail,
  setShowGroupLessonDetail: store.grandChartStore.setShowGroupLessonDetail,
  list: store.grandChartStore.groupLessonDetail
}))
@observer
export class GroupLessonView extends React.Component<GroupLessonViewProps, GroupLessonViewState> {

  static defaultProps = {
    isTrialValid: false,
    show: false,
    list: [],
    setShowGroupLessonDetail: () => console.log('Not set handler')
  };

  componentWillUnmount() {
    const { setShowGroupLessonDetail } = this.props;
    setShowGroupLessonDetail(false);
  }

  render() {
    const { show, list, isTrialValid } = this.props;

    if (!show) {
      return false;
    }

    return (
      <div className={b(null, { show })}>
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
                                 lessons={groupLesson.lessons}
                                 description={groupLesson.description}
                                 sort={groupLesson.sort}
                                 is_active={groupLesson.is_active}
                                 meta_title={groupLesson.meta_title}
                                 meta_description={groupLesson.meta_description}
                                 meta_keywords={groupLesson.meta_keywords}
                                 slug={groupLesson.slug}
                                 isShowTrial={(index === 0 && isTrialValid)} />
          );
        })}
      </div>
    );
  }

}

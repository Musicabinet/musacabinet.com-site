import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './group-lesson-view.module.sass';
import { GroupLessonStore, RootStore } from '../../../../stores';
import { GroupLessonViewItem } from './item';

const b = block(style);

type GroupLessonViewProps = {
  isTrialValid: boolean;
  show: boolean;
  list: GroupLessonStore[];
  setShowGroupLessonDetail: (show: boolean) => void;
};
type GroupLessonViewState = {};

@inject((store: RootStore) => ({
  isTrialValid: store.userStore.trial_version.is_valid,
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
                                 groupLesson={groupLesson}
                                 isFirst={index === 0}
                                 isShowTrial={index === 0 && isTrialValid}
            />
          );
        })}
      </div>
    );
  }
}

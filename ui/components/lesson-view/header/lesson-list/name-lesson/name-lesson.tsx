import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './name-lesson.module.sass';
import { LessonStore, RootStore } from '../../../../../../stores';

const b = block(style);

type NameLessonProps = {
  lessonStore: LessonStore;
};
type NameLessonState = {};

@inject((store: RootStore) => ({
  lessonStore: store.lessonStore
}))
@observer
export class NameLesson extends React.Component<NameLessonProps, NameLessonState> {
  static defaultProps = {
    lessonStore: LessonStore
  };

  render() {
    const { lessonStore } = this.props;

    return <div className={b(null)}>{lessonStore.nameScore}</div>;
  }
}

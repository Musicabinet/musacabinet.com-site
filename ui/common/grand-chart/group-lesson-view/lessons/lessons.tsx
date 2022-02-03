import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './lessons.module.sass';
import { LessonStore, RootStore } from '../../../../../stores';
import { LessonItem } from './lesson-item';

const b = block(style);

type LessonsProps = {
  lessons: LessonStore[],
  lessonStore: LessonStore,
  isShowTrial: boolean;
};
type LessonsState = {};

@inject((store: RootStore) => ({
  lessonStore: store.lessonStore
}))
@observer
export class Lessons extends React.Component<LessonsProps, LessonsState> {

  static defaultProps = {
    lessonStore: {}
  };

  render() {
    const { lessons, lessonStore, isShowTrial } = this.props;

    return (
      <div className={b(null)}>
        {lessons.map((lesson, index) => {
          return <LessonItem key={lesson.id}
                             lesson={lesson}
                             isShowTrial={isShowTrial && index === 0}
                             isActive={lesson.uuid === lessonStore.uuid} />;
        })}
      </div>
    );
  }
}

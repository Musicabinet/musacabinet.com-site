import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './number-lesson.module.sass';
import { LessonStore, RootStore } from '../../../../../../stores';

const b = block(style);

type NumberLessonProps = {
  lessonStore: LessonStore;
};
type NumberLessonState = {};

@inject((store: RootStore) => ({
  lessonStore: store.lessonStore
}))
@observer
export class NumberLesson extends React.Component<NumberLessonProps, NumberLessonState> {
  static defaultProps = {
    lessonStore: {}
  };

  render() {
    const { lessonStore } = this.props;

    return <div className={b(null, {
      isGrayColor: lessonStore.isGrey
    })} style={{background: lessonStore.color}}>{lessonStore.number}</div>;
  }
}

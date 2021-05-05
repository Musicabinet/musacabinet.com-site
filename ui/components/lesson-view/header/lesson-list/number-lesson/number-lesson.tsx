import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './number-lesson.module.sass';
import { RootStore } from '../../../../../../stores';

const b = block(style);

type NumberLessonProps = {
  number: number
};
type NumberLessonState = {};

@inject((store: RootStore) => ({
  number: store.lessonStore.number
}))
@observer
export class NumberLesson extends React.Component<NumberLessonProps, NumberLessonState> {

  static defaultProps = {
    number: 0
  };

  render() {
    const { number } = this.props;

    return (
      <div className={b(null)}>{number}</div>
    );
  }
}

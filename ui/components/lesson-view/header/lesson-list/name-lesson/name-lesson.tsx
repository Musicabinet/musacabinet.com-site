import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './name-lesson.module.sass';
import { RootStore } from '../../../../../../stores';

const b = block(style);

type NameLessonProps = {
  name: string
};
type NameLessonState = {};

@inject((store: RootStore) => ({
  name: store.lessonStore.name
}))
@observer
export class NameLesson extends React.Component<NameLessonProps, NameLessonState> {

  static defaultProps = {
    name: ''
  };

  render() {
    const { name } = this.props;

    return (
      <div className={b(null)}>{name}</div>
    );
  }
}

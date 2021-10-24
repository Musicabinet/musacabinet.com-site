import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './module-navigation.module.sass';
import { RootStore } from '../../../../../../stores';
import { Arrow } from './arrow/arrow';
import { LessonDirection } from '../../../../../../interfaces';
import Router from 'next/router';

const b = block(style);

type ModuleNavigationProps = {
  prevModuleLesson: null | string;
  nextModuleLesson: null | string;
};
type ModuleNavigationState = {};

@inject((store: RootStore) => ({
  prevModuleLesson: store.lessonStore.prevModuleLesson,
  nextModuleLesson: store.lessonStore.nextModuleLesson
}))
@observer
export class ModuleNavigation extends React.Component<ModuleNavigationProps, ModuleNavigationState> {
  static defaultProps = {
    prevModuleLesson: null,
    nextModuleLesson: null
  };

  handleOnClick = async (direction: LessonDirection.LEFT | LessonDirection.RIGHT) => {
    const { prevModuleLesson, nextModuleLesson } = this.props;

    if (direction === LessonDirection.LEFT && prevModuleLesson) {
      await Router.push(`/lesson/[uuid]`, `/lesson/${prevModuleLesson}`);
    }

    if (direction === LessonDirection.RIGHT && nextModuleLesson) {
      await Router.push(`/lesson/[uuid]`, `/lesson/${nextModuleLesson}`);
    }
  };

  render() {
    const { prevModuleLesson, nextModuleLesson } = this.props;

    return (
      <div className={b(null)}>
        <Arrow hidden={!prevModuleLesson} direction={LessonDirection.LEFT} onClick={this.handleOnClick} />
        Module
        <Arrow hidden={!nextModuleLesson} direction={LessonDirection.RIGHT} onClick={this.handleOnClick} />
      </div>
    );
  }
}

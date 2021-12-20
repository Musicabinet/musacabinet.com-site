import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './module-navigation.module.sass';
import { LessonStore, RootStore } from '../../../../../../stores';
import { Arrow } from './arrow/arrow';
import { LessonDirection } from '../../../../../../interfaces';
import Router from 'next/router';
import { MapStore } from '../../../../../../stores/map';

const b = block(style);

type ModuleNavigationProps = {
  lessonStore: LessonStore;
  mapStore: MapStore;
};
type ModuleNavigationState = {};

@inject((store: RootStore) => ({
  lessonStore: store.lessonStore,
  mapStore: store.mapStore
}))
@observer
export class ModuleNavigation extends React.Component<ModuleNavigationProps, ModuleNavigationState> {

  static defaultProps = {
    lessonStore: {},
    mapStore: {}
  };

  handleOnClick = async (direction: LessonDirection.LEFT | LessonDirection.RIGHT) => {
    const { mapStore } = this.props;

    if (direction === LessonDirection.LEFT) {
      await Router.push(`/lesson/[uuid]`, `/lesson/${mapStore.prevLesson}`);
    }

    if (direction === LessonDirection.RIGHT) {
      await Router.push(`/lesson/[uuid]`, `/lesson/${mapStore.nextLesson}`);
    }
  };

  render() {
    return (
      <div className={b(null)}>
        <Arrow direction={LessonDirection.LEFT} onClick={this.handleOnClick} />
        Module
        <Arrow direction={LessonDirection.RIGHT} onClick={this.handleOnClick} />
      </div>
    );
  }
}

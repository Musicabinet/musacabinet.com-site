import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './module-navigation.module.sass';
import { LessonStore, RootStore } from '../../../../../../stores';
import { Arrow } from './arrow/arrow';
import { LessonDirection, MapI } from '../../../../../../interfaces';
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
    const { lessonStore, mapStore } = this.props;

    let data = JSON.stringify(mapStore.list);
    let newList: MapI = JSON.parse(data);
    let keys = Object.keys(newList);
    let keyCourseModule = `${lessonStore.group_lesson?.collections?.course_id}${lessonStore.group_lesson?.collections?.module_id}`;

    if (direction === LessonDirection.LEFT) {
      let nextIndex = keys.indexOf(`${keyCourseModule}`) - 1;
      let nextItem = keys[nextIndex];
      let keyMinimum = Object.keys(newList[nextItem]).reduce((key, v) => newList[nextItem][v] < newList[nextItem][key] ? v : key);
      await Router.push(`/lesson/[uuid]`, `/lesson/${keyMinimum}`);
    }

    if (direction === LessonDirection.RIGHT) {
      let nextIndex = keys.indexOf(`${keyCourseModule}`) + 1;
      let nextItem = keys[nextIndex];

      let keyMinimum = Object.keys(newList[nextItem]).reduce((key, v) => newList[nextItem][v] < newList[nextItem][key] ? v : key);
      await Router.push(`/lesson/[uuid]`, `/lesson/${keyMinimum}`);
    }
  };

  render() {
    //const { lessonStore, mapStore } = this.props;

    //let data = JSON.stringify(mapStore.list);
    //let newList: MapI = JSON.parse(data);
    //let keys = Object.keys(newList);
    //let keyCourseModule = `${lessonStore.group_lesson?.collections?.course_id}${lessonStore.group_lesson?.collections?.module_id}`;
    //let nextIndex = keys.indexOf(`${keyCourseModule}`) + 1;
    //let nextItem = keys[nextIndex];

    return (
      <div className={b(null)}>
        <Arrow direction={LessonDirection.LEFT} onClick={this.handleOnClick} />
        Module
        <Arrow direction={LessonDirection.RIGHT} onClick={this.handleOnClick} />
      </div>
    );
  }
}

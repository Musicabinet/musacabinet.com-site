import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './button.module.sass';
import { LessonStore, RootStore, SystemStore } from '../../../../../../stores';
import {  MODULE_BUTTON_TYPE } from '../../../../../../constants';
import Router from 'next/router';
import { MapStore } from '../../../../../../stores/map';

const b = block(style);

type ButtonProps = {
  systemStore: SystemStore,
  lessonStore: LessonStore,
  mapStore: MapStore,
  type: MODULE_BUTTON_TYPE,
  className: string,
};
type ButtonState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  lessonStore: store.lessonStore,
  mapStore: store.mapStore
}))
@observer
export class Button extends React.Component<ButtonProps, ButtonState> {

  interval: number = 0;

  static defaultProps = {
    systemStore: {},
    lessonStore: {},
    mapStore: {}
  };

  handleOnChange = async (e: React.FormEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const {type, mapStore} = this.props;


    if (type === MODULE_BUTTON_TYPE.LEFT) {
      await Router.push(`/lesson/[uuid]`, `/lesson/${mapStore.prevLesson}`);
    }

    if (type === MODULE_BUTTON_TYPE.RIGHT) {
      await Router.push(`/lesson/[uuid]`, `/lesson/${mapStore.nextLesson}`);
    }
  };

  render() {
    const { type, systemStore, className } = this.props;

    return (
      <button onClick={this.handleOnChange}
              className={`${b(null, {
                [type]: true,
                [systemStore.service_name]: true
              })} ${className}`}>
        {type === MODULE_BUTTON_TYPE.LEFT ? '' : ''}
      </button>
    );
  }
}

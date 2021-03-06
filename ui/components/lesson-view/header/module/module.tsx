import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './module.module.sass';
import { NextModuleStore, RootStore, SystemStore } from '../../../../../stores';
import Router from 'next/router';
import { MODULE_BUTTON_TYPE, SERVICE_NAME } from '../../../../../constants';
import { Timer } from './timer/timer';
import { Button } from './button/button';

const b = block(style);

type ModuleProps = {
  systemStore: SystemStore,
  nextModuleStore: NextModuleStore
};
type ModuleState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  nextModuleStore: store.nextModule
}))
@observer
export class Module extends React.Component<ModuleProps, ModuleState> {

  static defaultProps = {
    systemStore: {},
    nextModuleStore: {}
  };

  handleOnToLesson = async (uuid: string) => {
    await Router.push('/lesson/[uuid]', `/lesson/${uuid}`);
  };

  getAmountTime = (): 25 | 35 | 45 => {
    const { systemStore: { service_name } } = this.props;
    let time: 25 | 35 | 45 = 25;
    if (service_name === SERVICE_NAME.SCHOOL) time = 25;
    else if (service_name === SERVICE_NAME.COLLEGE) time = 35;
    else if (service_name === SERVICE_NAME.UNIVERSITY) time = 45;
    return time;
  };

  render() {
    const { systemStore } = this.props;

    return (
      <div
        className={b(null, {
          [systemStore.service_name]: true
        })}>
        <div className={b('header')}>
          <Button type={MODULE_BUTTON_TYPE.LEFT} className={b('btn-left')}/>
          Module
          <Button type={MODULE_BUTTON_TYPE.RIGHT}  className={b('btn-right')}/>
        </div>
        <div className={b('body')}>
          <Timer amountTime={this.getAmountTime()} />
        </div>
      </div>
    );
  }
}

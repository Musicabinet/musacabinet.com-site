import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './module.module.sass';
import { NextModuleStore, RootStore, SystemStore } from '../../../../../stores';
import Router from 'next/router';
import { SERVICE_NAME } from '../../../../../constants';
import { ModuleNavigation } from './module-navigation/module-navigation';
import { Timer } from './timer/timer';

const b = block(style);

type ModuleProps = {
  systemStore: SystemStore;
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

  getAmountTime = (): 15 | 30 | 45 | 60 => {
    const { systemStore: { service_name } } = this.props;
    let time = 15;
    if (service_name === SERVICE_NAME.SCHOOL) time = 30;
    else if (service_name === SERVICE_NAME.COLLEGE) time = 45;
    else if (service_name === SERVICE_NAME.UNIVERSITY) time = 45;

    // @ts-ignore
    return time;
  };

  render() {
    const { systemStore: { service_name }, nextModuleStore } = this.props;

    return (
      <div
        className={b(null, {
          [service_name]: true
        })}
      >
        <div className={b('header')}>
          <ModuleNavigation />
        </div>
        <div className={b('body')}>
          <Timer amountTime={this.getAmountTime()} onMessageAtTheEnd={nextModuleStore.start} />
        </div>
      </div>
    );
  }
}

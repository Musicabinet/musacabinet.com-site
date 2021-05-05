import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './module.module.sass';
import { RootStore } from '../../../../../stores';
import Router from 'next/router';
import { SERVICE_NAME } from '../../../../../constants';
import { ModuleNavigation } from './module-navigation/module-navigation';
import { LessonNavigation } from './lesson-navigation/lesson-navigation';
import { Timer } from './timer/timer';

const b = block(style);

type ModuleProps = {
  service_name: SERVICE_NAME
};
type ModuleState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name
}))
@observer
export class Module extends React.Component<ModuleProps, ModuleState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL
  };

  handleOnToLesson = async (uuid: string) => {
    await Router.push('/lesson/[uuid]', `/lesson/${uuid}`);
  };

  getAmountTime = (): 15 | 30 | 45 | 60 => {
    const { service_name } = this.props;
    let time = 15;
    if (service_name === SERVICE_NAME.SCHOOL)
      time = 30;
    else if (service_name === SERVICE_NAME.COLLEGE)
      time = 45;
    else if (service_name === SERVICE_NAME.UNIVERSITY)
      time = 45;

    // @ts-ignore
    return time;
  };

  render() {
    const { service_name } = this.props;

    return (
      <div className={b(null, {
        [service_name]: true
      })}>
        <div className={b('header')}>
          <ModuleNavigation />
        </div>
        <div className={b('body')}>
          <LessonNavigation />
          <Timer amountTime={this.getAmountTime()} />
        </div>
      </div>
    );
  }
}

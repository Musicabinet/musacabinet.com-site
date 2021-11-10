import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './next-module.module.sass';
import { LessonStore, NextModuleStore, RootStore, SystemStore } from '../../../../stores';
import { Modal } from '../../modal/modal';
import { InstrumentIcon } from '../../instrument-icon/instrument-icon';
import moment from 'moment';
import { Button } from '../../button/button';
import Router from 'next/router';

const b = block(style);

type NextModuleProps = {
  systemStore: SystemStore,
  nextModuleStore: NextModuleStore,
  lessonStore: LessonStore,
};
type NextModuleState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  nextModuleStore: store.nextModule,
  lessonStore: store.lessonStore
}))
@observer
export class NextModule extends React.Component<NextModuleProps, NextModuleState> {
  static defaultProps = {
    systemStore: {},
    nextModuleStore: {},
    lessonStore: {}
  };

  componentDidMount() {
  }

  handleOnNext = async () => {
    const { lessonStore } = this.props;
    await Router.push(`/lesson/[uuid]`, `/lesson/${lessonStore.nextModuleLesson}`);
  };

  render() {
    const { systemStore, nextModuleStore } = this.props;

    return (
      <Modal size={'small'} isOpen={nextModuleStore.isShow} auto onClose={nextModuleStore.close}>
        <div className={b(null, { [systemStore.service_name]: true })}>
          <div className={b('icon')}>
            <InstrumentIcon icon={systemStore.instrument_icon} service={systemStore.service_name} />
          </div>
          <div className={b('message')}>We recommend to take a break and move to the next module</div>
          <div className={b('timer')}>{moment().startOf('day').seconds(nextModuleStore.second).format('mm:ss')}</div>
          <div className={b('progress')}>
            <div className={b('line')} style={{ width: `${nextModuleStore.percent}%` }} />
          </div>

          <div className={b('actions')}>
            <Button className={b('btn-default')} onClick={nextModuleStore.close}>Stay Here</Button>
            <Button className={b('btn-primary')} onClick={this.handleOnNext}>Next Module</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

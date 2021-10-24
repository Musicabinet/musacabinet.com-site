import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './next-module.module.sass';
import { RootStore } from '../../../../stores';
import { Modal } from '../../modal/modal';
import { SERVICE_NAME } from '../../../../constants';
import { LIST_ICON } from '../../icons';
import { InstrumentIcon } from '../../instrument-icon/instrument-icon';
import moment from 'moment';
import { Button } from '../../button/button';

const b = block(style);

type NextModuleProps = {
  service_name: SERVICE_NAME;
  instrument_icon: LIST_ICON.GUITAR | LIST_ICON.SAXOPHONE | LIST_ICON.KEYBOARD;
  isShow: boolean;
  second: number;
  percent: number;
};
type NextModuleState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  instrument_icon: store.systemStore.instrument_icon,
  isShow: store.nextModule.isShow,
  second: store.nextModule.second,
  percent: store.nextModule.percent
}))
@observer
export class NextModule extends React.Component<NextModuleProps, NextModuleState> {
  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    instrument_icon: LIST_ICON.GUITAR,
    isShow: false,
    second: 0,
    percent: 0
  };

  componentDidMount() {}

  render() {
    const { service_name, instrument_icon, second, isShow, percent } = this.props;

    return (
      <Modal size={'small'} isOpen={isShow} auto onClose={() => console.log('close')}>
        <div className={b(null, { [service_name]: true })}>
          <div className={b('icon')}>
            <InstrumentIcon icon={instrument_icon} service={service_name} />
          </div>
          <div className={b('message')}>We recommend to take a break and move to the next module</div>
          <div className={b('timer')}>{moment().startOf('day').seconds(second).format('mm:ss')}</div>
          <div className={b('progress')}>
            <div className={b('line')} style={{ width: `${percent}%` }} />
          </div>

          <div className={b('actions')}>
            <Button className={b('btn-default')}>Stay Here</Button>
            <Button className={b('btn-primary')}>Next Module</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

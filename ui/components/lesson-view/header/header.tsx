import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './header.module.sass';
import { BreadCrumbs } from './breadcrumbs/breadcrumbs';
import { LessonList } from './lesson-list/lesson-list';
import { InstrumentIcon } from '../../../common';
import { ModalsStore, RootStore, SystemStore } from '../../../../stores';
import { MODALS_GRAND_CHART, SERVICE_NAME } from '../../../../constants';
import { LIST_ICON } from '../../../common/icons';
import { Player } from './player/player';
import { Metronome } from './metronome/metronome';
import { Module } from './module/module';

const b = block(style);

type HeaderProps = {
  systemStore: SystemStore;
  modalsStore: ModalsStore;
  instrument_name: string;
  instrument_icon: LIST_ICON.GUITAR | LIST_ICON.KEYBOARD | LIST_ICON.SAXOPHONE;
  service_name: SERVICE_NAME;
};
type HeaderState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  modalsStore: store.modalsStore,
  instrument_name: store.systemStore.instrument_name,
  instrument_icon: store.systemStore.instrument_icon,
  service_name: store.systemStore.service_name,
}))
@observer
export class Header extends React.Component<HeaderProps, HeaderState> {
  static defaultProps = {
    modalsStore: {},
    systemStore: {},
    service_name: SERVICE_NAME.SCHOOL,
    instrument_name: '',
    instrument_icon: LIST_ICON.GUITAR,
  };

  handleOnShwGrandChard = async () => {
    const { modalsStore, systemStore } = this.props;
    const modalKey = `${systemStore.service_id}-${systemStore.instrument_id}` as MODALS_GRAND_CHART;
    modalsStore.show(modalKey);
  };

  render() {
    const { service_name, instrument_icon, instrument_name } = this.props;

    return (
      <div className={b(null)}>
        <div className={b('left-side')}>
          <div className={b('container')}>
            <div className={b('name-icon')}>
              <div className={b('name-instrument', { [service_name]: true })} onClick={this.handleOnShwGrandChard}>
                {instrument_name}
              </div>
              <div className={b('icon')} onClick={this.handleOnShwGrandChard}>
                <InstrumentIcon icon={instrument_icon} service={service_name} />
              </div>
            </div>
            <div className={b('breadcrumbs-list-lesson')}>
              <BreadCrumbs />
              <LessonList />
            </div>
          </div>
          <Player />
        </div>

        <div className={b('right-side')}>
          <Metronome />
          <Module />
        </div>
      </div>
    );
  }
}

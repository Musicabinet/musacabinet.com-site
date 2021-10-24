import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './header.module.sass';
import { BreadCrumbs } from './breadcrumbs/breadcrumbs';
import { LessonList } from './lesson-list/lesson-list';
import { InstrumentIcon } from '../../../common';
import { RootStore } from '../../../../stores';
import { MODALS, SERVICE_NAME } from '../../../../constants';
import { LIST_ICON } from '../../../common/icons';
import { Module } from './module/module';
import { Player } from './player/player';

const b = block(style);

type HeaderProps = {
  instrument_name: string;
  instrument_icon: LIST_ICON.GUITAR | LIST_ICON.KEYBOARD | LIST_ICON.SAXOPHONE;
  service_name: SERVICE_NAME;
  onShowModal: (id_modal: MODALS) => void;
  onGetGranChart: () => Promise<void>;
};
type HeaderState = {};

@inject((store: RootStore) => ({
  instrument_name: store.systemStore.instrument_name,
  instrument_icon: store.systemStore.instrument_icon,
  service_name: store.systemStore.service_name,
  onShowModal: store.modalsStore.show,
  onGetGranChart: store.grandChartStore.getList
}))
@observer
export class Header extends React.Component<HeaderProps, HeaderState> {
  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    instrument_name: '',
    instrument_icon: LIST_ICON.GUITAR,
    onShowModal: () => console.log('Not set handler'),
    onGetGranChart: () => console.log('Not set handler')
  };

  handleOnShwGrandChard = async () => {
    const { onShowModal, onGetGranChart } = this.props;
    onShowModal(MODALS.GRAND_CHART);
    await onGetGranChart();
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
          <Module />
        </div>
      </div>
    );
  }
}

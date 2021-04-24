import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './grand-chart.module.sass';
import { RootStore } from '../../../../stores';
import { Modal } from '../../modal/modal';
import { InstrumentIcon } from '../../instrument-icon/instrument-icon';
import { ICONS_NAME, MODALS, SERVICE_NAME } from '../../../../constants';
import { Modules } from './modules/modules';
import { Courses } from './courses/courses';
import { GroupLessons } from './group-lessons/group-lessons';
import { GroupLessonView } from './group-lesson-view/group-lesson-view';

const b = block(style);

type GrandChartModalProps = {
  is_show: boolean,
  service_name: SERVICE_NAME,
  instrument_icon: ICONS_NAME,
  onCloseModal: (id_modal: MODALS) => void
};
type GrandChartModalState = {};

@inject((store: RootStore) => ({
  is_show: store.modalsStore.list[MODALS.GRAND_CHART],
  service_name: store.systemStore.service_name,
  instrument_icon: store.systemStore.instrument_icon,
  onCloseModal: store.modalsStore.close
}))
@observer
export class GrandChartModal extends React.Component<GrandChartModalProps, GrandChartModalState> {

  static defaultProps = {
    is_show: false,
    service_name: undefined,
    instrument_icon: '',
    onCloseModal: () => console.log('Not set handler')
  };

  handleOnClose = () => {
    const { onCloseModal } = this.props;
    onCloseModal(MODALS.GRAND_CHART);
  };

  render() {
    const { is_show, service_name, instrument_icon } = this.props;
    return (
      <Modal isOpen={is_show} size={'large'} onClose={this.handleOnClose}>
        <div className={b(null)}>
          <header className={b('header')}>
            <div className={b('logotype')}>
              <InstrumentIcon service={service_name} icon={instrument_icon} />
              <div className={b('name', {
                [service_name]: true
              })}>Grand<br /> Chart
              </div>
            </div>
            <Modules />
          </header>

          <div className={b('container')}>
            <div className={b('sidebar')}>
              <Courses />
            </div>
            <div className={b('content')}>
              <GroupLessonView />
              <GroupLessons />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

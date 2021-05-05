import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './cabinet-subscriptions.module.sass';
import { RootStore } from '../../../stores';
import { InstrumentI } from '../../../interfaces';
import { MODALS, SERVICE_MAPPING } from '../../../constants';
import { ButtonGrandChart } from '../button-grand-chart/button-grand-chart';
import { InstrumentIcon } from '../instrument-icon/instrument-icon';

const b = block(style);

type CabinetSubscriptionItemProps = {
  onSetServiceId: (id: number) => void,
  onSetServiceName: (name: string) => void,
  onSetInstrumentId: (id: number) => void,
  onSetInstrumentName: (name: string) => void,
  onSetInstrumentIcon: (name: string) => void,
  onShowModal: (id_modal: MODALS) => void,
  onGetGranChart: () => Promise<void>
};
type CabinetSubscriptionItemState = {};

@inject((store: RootStore) => ({
  onSetServiceId: store.systemStore.setServiceId,
  onSetServiceName: store.systemStore.setServiceName,
  onSetInstrumentId: store.systemStore.setInstrumentId,
  onSetInstrumentName: store.systemStore.setInstrumentName,
  onSetInstrumentIcon: store.systemStore.setInstrumentIcon,
  onShowModal: store.modalsStore.show,
  onGetGranChart: store.grandChartStore.getList

}))
@observer
export class CabinetSubscriptionItem extends React.Component<CabinetSubscriptionItemProps & InstrumentI, CabinetSubscriptionItemState> {

  static defaultProps = {
    onSetServiceId: () => console.log('Not set handler'),
    onSetServiceName: () => console.log('Not set handler'),
    onSetInstrumentId: () => console.log('Not set handler'),
    onSetInstrumentName: () => console.log('Not set handler'),
    onSetInstrumentIcon: () => console.log('Not set handler'),
    onShowModal: () => console.log('Not set handler'),
    onGetGranChart: () => console.log('Not set handler')
  };

  handleOnOpenGrandChart = async () => {
    const {
      service_id,
      id,
      name,
      icon,
      onSetServiceId,
      onSetServiceName,
      onSetInstrumentId,
      onSetInstrumentName,
      onSetInstrumentIcon,
      onShowModal,
      onGetGranChart
    } = this.props;

    onSetServiceId(service_id);
    onSetServiceName(SERVICE_MAPPING[service_id]);
    onSetInstrumentId(id);
    onSetInstrumentName(name);
    onSetInstrumentIcon(icon);

    // Открываем гранд чарт
    onShowModal(MODALS.GRAND_CHART);

    // Получение гранд чарта
    await onGetGranChart();
  };

  render() {
    const { service_id, name, is_active, icon } = this.props;

    return (
      <div className={b('item', {
        'not_active': (!is_active)
      })}>
        <div className={b('inside', { [SERVICE_MAPPING[service_id]]: true })}>
          <div className={b('icon')}>
            <InstrumentIcon icon={icon} service={SERVICE_MAPPING[service_id]}/>
          </div>

          <div className={b('name')}>
            {name} {SERVICE_MAPPING[service_id]}
          </div>

          {is_active ? (
            <>
              <ButtonGrandChart onClick={this.handleOnOpenGrandChart}
                                service={SERVICE_MAPPING[service_id]}>
                GrandChart
              </ButtonGrandChart>

              <div className={b('count', { [SERVICE_MAPPING[service_id]]: true })}>
                3 months
              </div>
            </>
          ) : (
            <ButtonGrandChart service={SERVICE_MAPPING[service_id]}>Coming soon...</ButtonGrandChart>
          )}

        </div>
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './statistic-days.module.sass';
import { InstrumentIcon } from '../instrument-icon/instrument-icon';
import { GrandChartStore, InstrumentStore, ModalsStore, RootStore, SystemStore } from '../../../stores';
import { MODALS, SERVICE_DURATION_MINUTE, SERVICE_MAPPING } from '../../../constants';
import { ucFirst } from '../../../helpers';

const b = block(style);

type ItemProps = {
  instrument: InstrumentStore,
  systemStore: SystemStore,
  modalsStore: ModalsStore,
  grandChartStore: GrandChartStore
};
type ItemState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  modalsStore: store.modalsStore,
  grandChartStore: store.grandChartStore
}))
@observer
export default class Item extends React.Component<ItemProps, ItemState> {

  static defaultProps = {
    systemStore: {},
    modalsStore: {},
    grandChartStore: {}
  };

  handleOpenGrandChart = async () => {
    const { instrument, systemStore, modalsStore, grandChartStore } = this.props;

    systemStore.setServiceId(instrument.service_id);
    systemStore.setServiceName(SERVICE_MAPPING[instrument.service_id]);
    systemStore.setInstrumentId(instrument.id);
    systemStore.setInstrumentName(instrument.name);
    systemStore.setInstrumentIcon(instrument.icon);

    // Открываем гранд чарт
    modalsStore.show(MODALS.GRAND_CHART);

    // Получение гранд чарта
    await grandChartStore.getList();
  };

  render() {
    const { instrument } = this.props;

    return (
      <div className={b('item')}>
        <div className={b('left')}>
          <InstrumentIcon icon={instrument.icon} service={SERVICE_MAPPING[instrument.service_id]} />
        </div>

        <div className={b('right')}>
          <div className={b('header')}>{instrument.name} {ucFirst(SERVICE_MAPPING[instrument.service_id])} for today
          </div>
          <div className={b('message')}>
            You study
            <span className={b('service', {
              [SERVICE_MAPPING[instrument.service_id]]: true
            })}>{SERVICE_DURATION_MINUTE[instrument.service_id]} minutes</span>
            every day
            <div className={b('percent', {
              [SERVICE_MAPPING[instrument.service_id]]: true
            })}>
              0%
              <div className={b('info')}>of the daily plan<br /> completed</div>
            </div>
          </div>

          <div className={b('progress-bar')}>

          </div>
        </div>

        <div className={b('actions')}>
          <button onClick={this.handleOpenGrandChart}
                  className={b('button', {
                    [SERVICE_MAPPING[instrument.service_id]]: true
                  })}>Go
          </button>
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './cabinet-subscriptions.module.sass';
import { RootStore, UserStore, InstrumentStore, SystemStore, ModalsStore, GrandChartStore } from '../../../stores';
import { MODALS, SERVICE_MAPPING } from '../../../constants';
import { ButtonGrandChart } from '../button-grand-chart/button-grand-chart';
import { InstrumentIcon } from '../instrument-icon/instrument-icon';
import { StatisticsListStore } from '../../../stores/statistics-list';
import { PurchaseStore } from '../../../stores/purchase';
import { TrialVersionStore } from '../../../stores/trial-version';

const b = block(style);

type CabinetSubscriptionItemProps = {
  instrument: InstrumentStore,
  user: UserStore;
  systemStore: SystemStore,
  modalsStore: ModalsStore,
  grandChartStore: GrandChartStore,
  statisticsListStore: StatisticsListStore
};
type CabinetSubscriptionItemState = {};

@inject((store: RootStore) => ({
  user: store.userStore,
  systemStore: store.systemStore,
  modalsStore: store.modalsStore,
  grandChartStore: store.grandChartStore,
  statisticsListStore: store.statisticsListStore
}))
@observer
export class CabinetSubscriptionItem extends React.Component<CabinetSubscriptionItemProps, CabinetSubscriptionItemState> {
  static defaultProps = {
    user: {},
    systemStore: {},
    modalsStore: {},
    grandChartStore: {},
    statisticsListStore: {}
  };

  handleOnOpenGrandChart = async () => {
    const {
      instrument,
      systemStore,
      modalsStore,
      grandChartStore,
      statisticsListStore
    } = this.props;

    // Записываем данные
    systemStore.setServiceId(instrument.service_id);
    systemStore.setServiceName(SERVICE_MAPPING[instrument.service_id]);
    systemStore.setInstrumentId(instrument.id);
    systemStore.setInstrumentName(instrument.name);
    systemStore.setInstrumentIcon(instrument.icon);

    // Открываем гранд чарт
    modalsStore.show(MODALS.GRAND_CHART);

    try{
      // Получение гранд чарта
      await grandChartStore.getList();
      await statisticsListStore.get();
    }catch (e) {
      console.error(`Error in handleOnOpenGrandChart : `, e);
    }
  };

  getIsPurchaseUser = (): PurchaseStore | TrialVersionStore => {
    const { user, instrument } = this.props;
    // Проверка покупки
    const isPurchaseUser = user.checkSubscription(instrument.service_id, instrument.id);
    // Возвращаем данные
    return isPurchaseUser.length > 0 ? isPurchaseUser[0] : user.trial_version;
  };


  render() {
    let { instrument } = this.props;


    return (
      <div
        className={b('item', {
          not_active: !instrument.is_active,
          [SERVICE_MAPPING[instrument.service_id]]: true
        })}
      >
        <div className={b('inside', { [SERVICE_MAPPING[instrument.service_id]]: true })}>
          <div className={b('icon')}>
            <InstrumentIcon icon={instrument.icon} service={SERVICE_MAPPING[instrument.service_id]} />
          </div>

          <div className={b('name')}>
            {instrument.name} {SERVICE_MAPPING[instrument.service_id]}
          </div>

          {instrument.is_active ? (
            <>
              <ButtonGrandChart onClick={this.handleOnOpenGrandChart} service={SERVICE_MAPPING[instrument.service_id]}>
                GrandChart
              </ButtonGrandChart>

              <div className={b('count', { [SERVICE_MAPPING[instrument.service_id]]: true })}>
                {this.getIsPurchaseUser().totalDays} days
              </div>

              <div className={b('progress-line')}>
                <div className={b('line')} style={{ width: this.getIsPurchaseUser().percentPassed }} />
              </div>

              <div className={b('days')}>
                <div className={b('passed-days')}>
                  <div className={b('count-days', { [SERVICE_MAPPING[instrument.service_id]]: true })}>
                    {this.getIsPurchaseUser().days_passed}
                  </div>
                  <div className={b('description')}>
                    Days
                    <br /> passed
                  </div>
                </div>

                <div className={b('remain-days')}>
                  <div className={b('count-days')}>
                    {this.getIsPurchaseUser().days_remain}
                  </div>
                  <div className={b('description')}>
                    Days
                    <br /> remain
                  </div>
                </div>
              </div>
            </>
          ) : (
            <ButtonGrandChart service={SERVICE_MAPPING[instrument.service_id]}>Coming soon...</ButtonGrandChart>
          )}
        </div>
      </div>
    );
  }
}

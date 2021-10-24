import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './cabinet-subscriptions.module.sass';
import { RootStore, ServicesStore } from '../../../stores';
import { CabinetSubscriptionItem } from './item';

const b = block(style);

type CabinetSubscriptionsProps = {
  servicesStore: ServicesStore
};
type CabinetSubscriptionsState = {};

@inject((store: RootStore) => ({
  servicesStore: store.servicesStore
}))
@observer
export class CabinetSubscriptions extends React.Component<CabinetSubscriptionsProps, CabinetSubscriptionsState> {
  static defaultProps = {
    servicesStore: {}
  };

  render() {
    const { servicesStore } = this.props;

    return (
      <div className={b(null)}>
        {servicesStore.list.map((service) => {
          return (
            <div key={service.id} className={b('column')}>
              {service.instruments.map((instrument) => {
                return (
                  <CabinetSubscriptionItem key={instrument.id}
                                           instrument={instrument} />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

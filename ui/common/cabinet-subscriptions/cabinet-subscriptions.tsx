import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './cabinet-subscriptions.module.sass';
import { RootStore } from '../../../stores';
import { ServiceStore } from '../../../stores/service';
import { CabinetSubscriptionItem } from './item';

const b = block(style);

type CabinetSubscriptionsProps = {
  list: ServiceStore[]
};
type CabinetSubscriptionsState = {};

@inject((store: RootStore) => ({
  list: store.servicesStore.list
}))
@observer
export class CabinetSubscriptions extends React.Component<CabinetSubscriptionsProps, CabinetSubscriptionsState> {

  static defaultProps = {
    list: []
  };

  render() {
    const { list } = this.props;

    return (
      <div className={b(null)}>
        {list.map((service) => {
          return (
            <div key={service.id}
                 className={b('column')}>
              {service.instruments.map((instrument) => {
                return (<CabinetSubscriptionItem key={instrument.id}
                                                 id={instrument.id}
                                                 service_id={instrument.service_id}
                                                 sort={instrument.sort}
                                                 slug={instrument.slug}
                                                 meta_title={instrument.meta_title}
                                                 meta_description={instrument.meta_description}
                                                 meta_keywords={instrument.meta_keywords}
                                                 name={instrument.name}
                                                 description={instrument.description}
                                                 icon={instrument.icon}
                                                 is_active={instrument.is_active} />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

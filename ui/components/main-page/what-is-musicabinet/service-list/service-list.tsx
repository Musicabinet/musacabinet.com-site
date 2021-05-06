import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './service-list.module.sass';
import { RootStore } from '../../../../../stores';
import { ServiceI } from '../../../../../interfaces';
import { ServiceItem } from './service-item';

const b = block(style);

type ServiceListProps = {
  list: ServiceI[]
};
type ServiceListState = {};

@inject((store: RootStore) => ({
  list: store.servicesStore.all
}))
@observer
export class ServiceList extends React.Component<ServiceListProps, ServiceListState> {

  static defaultProps = {
    list: []
  };

  render() {
    const { list } = this.props;

    return (
      <div className={`${b(null)} mb50`}>
        <div className='container g-lg-0'>
          <div className='row'>
            {list.map((service) => (
              <ServiceItem key={service.id}
                           id={service.id}
                           slug={service.slug}
                           is_active={service.is_active}
                           name={service.name}
                           instruments={service.instruments} />
            ))}
          </div>
        </div>


      </div>
    );
  }
}

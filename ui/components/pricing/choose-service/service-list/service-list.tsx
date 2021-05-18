import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './service-list.module.sass';
import { RootStore } from '../../../../../stores';
import { ServiceI } from '../../../../../interfaces';
import { ServiceItem } from './service-item';
import { SERVICE_NAME } from '../../../../../constants';

const b = block(style);

type ServiceListProps = {
  list: ServiceI[],
  current: SERVICE_NAME,
  onChoose: (service_name: SERVICE_NAME) => void
};
type ServiceListState = {};

@inject((store: RootStore) => ({
  list: store.servicesStore.list,
  current: store.systemStore.service_name,
  onChoose: store.systemStore.setServiceName
}))
@observer
export class ServiceList extends React.Component<ServiceListProps, ServiceListState> {

  static defaultProps = {
    list: [],
    current: SERVICE_NAME.SCHOOL,
    onChoose: () => console.log('Not set handler')
  };

  handleOnChooseService = (service_name: SERVICE_NAME) => {
    const { onChoose } = this.props;
    onChoose(service_name);
  };

  render() {
    const { list, current } = this.props;

    return (
      <div className={b(null)}>
        <div className='container g-lg-0'>
          <div className='row g-lg-0 d-flex'>
            {list.map((service) => {
              return <ServiceItem key={service.id}
                                  id={service.id}
                                  name={service.name}
                                  slug={service.slug}
                                  is_active={service.is_active}
                                  instruments={service.instruments}
                                  selected={current === service.slug}
                                  onChoose={this.handleOnChooseService} />;
            })}
          </div>
        </div>
      </div>

    );
  }

}

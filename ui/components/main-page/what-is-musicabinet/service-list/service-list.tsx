import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './service-list.module.sass';
import { RootStore, ServicesStore } from '../../../../../stores';
import { ServiceItem } from './service-item';
import { ButtonFreeTrial, Paragraph, Title } from '../../../../common';
import { TITLE_SIZE } from '../../../../../constants';

const b = block(style);

type ServiceListProps = {
  servicesStore: ServicesStore
};
type ServiceListState = {};

@inject((store: RootStore) => ({
  servicesStore: store.servicesStore
}))
@observer
export class ServiceList extends React.Component<ServiceListProps, ServiceListState> {
  static defaultProps = {
    servicesStore: {}
  };

  render() {
    const { servicesStore } = this.props;

    return (
      <>
        <div className='container g-lg-0'>
          <div className='row'>
            <div className='col-lg-12'>
              <Title size={TITLE_SIZE.SECOND} className={'text-center mb50'}>
                Each instrument has 3 levels <br/>of difficulty
              </Title>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-10 offset-lg-1 text-center mb50">
              <Paragraph>
                Each one of them has its special unque methods. If you are not sure you can take a test to find where we recommend you to start
              </Paragraph>
            </div>
          </div>
        </div>

        <div className={`${b(null)} mb80`}>
          <div className='container g-lg-0'>
            <div className='row'>
              {servicesStore.all.map((service) => (
                <ServiceItem key={service.id}
                             service={service} />
              ))}
            </div>
          </div>
        </div>

        <div className='container mb80'>
          <div className="row">
            <div className="col-lg-12 text-center">
              <ButtonFreeTrial />
            </div>
          </div>
        </div>
      </>
    );
  }
}

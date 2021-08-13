import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout } from '../../ui';
import { CustomAppContext } from '../../interfaces';
import { SERVICE_NAME } from '../../constants';
import { Pricing } from '../../ui/components';
import { RootStore } from '../../stores';
import { PricingStore } from '../../stores/pricing';

type PricingPageProps = {
  pricingStore: PricingStore
};
type PricingPageState = {};

@inject((store: RootStore) => ({
  pricingStore: store.pricingStore
}))
@observer
export default class PricingPage extends React.Component<PricingPageProps, PricingPageState> {

  static async getInitialProps({ store }: CustomAppContext) {
    store?.systemStore.setServiceName(SERVICE_NAME.SCHOOL);
    await store?.servicesStore.getList();
    await store?.servicesStore.getAll();
    return {
      title: 'MUSICABINET | Pricing',
      description: '',
      keywords: ''
    };
  }

  static defaultProps = {
    pricingStore: {}
  };

  async componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const session_id = urlSearchParams.get('session_id');
    const service_name = urlSearchParams.get('service_name');
    const type_name = urlSearchParams.get('type_name');
    const price_id = urlSearchParams.get('price_id');
    const service_id = urlSearchParams.get('service_id');

    if (session_id && service_name && type_name && price_id) {
      const { pricingStore } = this.props;
      pricingStore.setDisabledScreen(true);

      console.log('params', {
        session_id, service_name, type_name, price_id, service_id
      });

      await pricingStore.checkSession({
        session_id, service_name, type_name, price_id, service_id
      })
    }

  }

  render() {
    return (
      <BaseLayout noStick full>
        <Pricing />
      </BaseLayout>
    );
  }
}

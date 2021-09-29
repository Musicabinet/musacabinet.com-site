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

  }

  render() {
    return (
      <BaseLayout noStick full>
        <Pricing />
      </BaseLayout>
    );
  }
}

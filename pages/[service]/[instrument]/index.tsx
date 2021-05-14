import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { CustomAppContext } from '../../../interfaces';
import { BaseLayout } from '../../../ui';
import { MAPPING_INSTRUMENT_ID, MAPPING_SERVICE_ID, SERVICE_NAME } from '../../../constants';
import { InstrumentView } from '../../../ui/components';


type InstrumentPageProps = {};
type InstrumentPageState = {};

@inject(() => ({}))
@observer
export default class InstrumentPage extends React.Component<InstrumentPageProps, InstrumentPageState> {

  static async getInitialProps({ store, ctx: { query } }: CustomAppContext) {
    const { service, instrument } = query;
    await store?.authStore.check();

    store?.systemStore.setServiceName(service as SERVICE_NAME);
    store?.systemStore.setInstrumentName(String(instrument));

    const key = `${service}-${instrument}`;
    // @ts-ignore
    const serviceID = MAPPING_SERVICE_ID[key];
    // @ts-ignore
    const instrumentID = MAPPING_INSTRUMENT_ID[key];

    // @ts-ignore
    store?.systemStore.setInstrumentIcon(String(instrument).toUpperCase());
    store?.systemStore.setInstrumentName(String(instrument));
    store?.systemStore.setServiceId(serviceID);
    store?.systemStore.setInstrumentId(instrumentID);

    await store?.grandChartStore.getList();

    return {
      title: 'Online music school. Comprehensive music education. ',
      description: '',
      keywords: ''
    };
  }

  render() {
    return (
      <BaseLayout full>
        <InstrumentView />
      </BaseLayout>
    );
  }
}

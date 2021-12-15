import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout, CabinetLayout, MainStatistics } from '../../../ui';
import { CustomAppContext } from '../../../interfaces';
import { redirectToWrapper } from '../../../core';

type YourStatisticsProps = {};
type YourStatisticsState = {};

@inject(() => ({}))
@observer
export default class YourStatistics extends React.Component<YourStatisticsProps, YourStatisticsState> {
  static async getInitialProps({ store, ctx: { res } }: CustomAppContext) {
    await store?.authStore.check(() => redirectToWrapper(res, '/'));
    await store?.instrumentsStore.getAll();

    return {
      title: 'MC | My Statistics',
      description: '',
      keywords: ''
    };
  }

  render() {
    return (
      <BaseLayout background={'gray'} noStick>
        <CabinetLayout>
          <MainStatistics/>
        </CabinetLayout>
      </BaseLayout>
    );
  }
}

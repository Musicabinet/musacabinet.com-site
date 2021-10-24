import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout, CabinetLayout, StatisticDays } from '../../../ui';
import { CustomAppContext } from '../../../interfaces';
import { redirectToWrapper } from '../../../core';

type YourDayPageProps = {};
type YourDayPageState = {};

@inject(() => ({}))
@observer
export default class YourDayPage extends React.Component<YourDayPageProps, YourDayPageState> {
  static async getInitialProps({ store, ctx: { res } }: CustomAppContext) {
    await store?.authStore.check(() => redirectToWrapper(res, '/'));
    await store?.instrumentsStore.getAll();

    return {
      title: 'MC | Your day',
      description: '',
      keywords: ''
    };
  }

  render() {
    return (
      <BaseLayout background={'gray'} noStick>
        <CabinetLayout>
          <StatisticDays />
        </CabinetLayout>
      </BaseLayout>
    );
  }
}

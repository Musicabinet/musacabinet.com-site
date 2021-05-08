import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { CustomAppContext } from '../../interfaces';
import { redirectToWrapper } from '../../core';
import { BaseLayout, CabinetLayout, CabinetSubscriptions } from '../../ui';

type CabinetPageProps = {};
type CabinetPageState = {};

@inject(() => ({}))
@observer
export default class CabinetPage extends React.Component<CabinetPageProps, CabinetPageState> {

  static async getInitialProps({ store, ctx: { res } }: CustomAppContext) {
    await store?.authStore.check(() => redirectToWrapper(res, '/'));
    await store?.servicesStore.getList();
    return {};
  }

  render() {
    return (<BaseLayout background={'gray'} noStick>
      <CabinetLayout>
        <CabinetSubscriptions />
      </CabinetLayout>
    </BaseLayout>);
  }
}

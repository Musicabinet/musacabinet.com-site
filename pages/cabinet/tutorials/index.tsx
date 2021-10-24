import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout, CabinetLayout, Tutorials } from '../../../ui';
import { CustomAppContext } from '../../../interfaces';
import { redirectToWrapper } from '../../../core';

type TutorialsPageProps = {};
type TutorialsPageState = {};

@inject(() => ({}))
@observer
export default class TutorialsPage extends React.Component<TutorialsPageProps, TutorialsPageState> {
  static async getInitialProps({ store, ctx: { res } }: CustomAppContext) {
    await store?.authStore.check(() => redirectToWrapper(res, '/'));
    await store?.tutorialsStore.getList();

    return {
      title: 'MC | Tutorials',
      description: '',
      keywords: ''
    };
  }

  render() {
    return (
      <BaseLayout background={'gray'} noStick>
        <CabinetLayout>
          <Tutorials />
        </CabinetLayout>
      </BaseLayout>
    );
  }
}

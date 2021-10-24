import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout } from '../ui';
import { CustomAppContext } from '../interfaces';
import { MainPage } from '../ui/components';
import { SERVICE_ID } from '../constants';

type IndexPageProps = {};
type IndexPageState = {};

@inject(() => ({}))
@observer
export default class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  static async getInitialProps({ store }: CustomAppContext) {
    await store?.authStore.check();
    await store?.servicesStore.getAll();
    await store?.instrumentsStore.getAll(SERVICE_ID.SCHOOL);

    return {
      title: 'MUSICABINET | Online Music Education Platform',
      description: '',
      keywords: ''
    };
  }

  render() {
    return (
      <BaseLayout full>
        <MainPage />
      </BaseLayout>
    );
  }
}

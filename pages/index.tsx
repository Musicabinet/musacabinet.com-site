import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout } from '../ui';
import { CustomAppContext } from '../interfaces';
import { MainPage } from '../ui/components';

type IndexPageProps = {};
type IndexPageState = {};

@inject(() => ({}))
@observer
export default class IndexPage extends React.Component<IndexPageProps, IndexPageState> {

  static async getInitialProps({ store }: CustomAppContext) {
    await store?.authStore.check();
    await store?.instrumentsStore.getAll();

    return {
      title: 'Online music school. Comprehensive music education. ',
      description: '',
      keywords: ''
    };
  }

  render() {
    return (
      <BaseLayout full>
        <MainPage/>
      </BaseLayout>
    );
  }
}

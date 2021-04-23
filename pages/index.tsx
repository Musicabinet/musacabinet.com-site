import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout } from '../ui';
import { MainPage } from '../ui/components/main-page/main-page';

type IndexPageProps = {};
type IndexPageState = {};

@inject(() => ({}))
@observer
export default class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  render() {
    return (
      <BaseLayout>
        <MainPage />
      </BaseLayout>
    );
  }
}

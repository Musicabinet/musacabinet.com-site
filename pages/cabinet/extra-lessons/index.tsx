import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { BaseLayout, CabinetLayout } from '../../../ui';

type ExtraLessonsPageProps = {};
type ExtraLessonsPageState = {};

@inject(() => ({}))
@observer
export default class ExtraLessonsPage extends React.Component<ExtraLessonsPageProps, ExtraLessonsPageState> {
  render() {
    return (
      <BaseLayout background={'gray'} noStick>
        <CabinetLayout></CabinetLayout>
      </BaseLayout>
    );
  }
}

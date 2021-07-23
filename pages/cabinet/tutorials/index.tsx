import * as React from 'react';
import {inject, observer} from 'mobx-react';
import { BaseLayout, CabinetLayout } from '../../../ui';

type TutorialsPageProps = {};
type TutorialsPageState = {};

@inject(() => ({}))
@observer
export default class TutorialsPage extends React.Component<TutorialsPageProps, TutorialsPageState> {
  render() {
    return (
      <BaseLayout>
        <CabinetLayout>

        </CabinetLayout>
      </BaseLayout>
    );
  }
}

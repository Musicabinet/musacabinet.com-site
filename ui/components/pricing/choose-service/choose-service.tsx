import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './choose-service.module.sass';
import { RootStore } from '../../../../stores';
import { ServiceList } from './service-list/service-list';
import { InstrumentList } from './instrument-list/instrument-list';

const b = block(style);

type ChooseServiceProps = {};
type ChooseServiceState = {};

@inject((store: RootStore) => ({}))
@observer
export class ChooseService extends React.Component<ChooseServiceProps, ChooseServiceState> {
  render() {
    return (
      <div className={b(null)}>
        <InstrumentList />
        <ServiceList />
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './logotype.module.sass';
import { RootStore, SystemStore } from '../../../../stores';
import { InstrumentIcon } from '../../instrument-icon/instrument-icon';

const b = block(style);

type LogotypeProps = {
  systemStore: SystemStore
};
type LogotypeState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore
}))
@observer
export class Logotype extends React.Component<LogotypeProps, LogotypeState> {

  static defaultProps = {
    systemStore: {}
  };

  render() {
    const { systemStore } = this.props;

    return (
      <div className={b(null)}>
        <InstrumentIcon service={systemStore.service_name} icon={systemStore.instrument_icon} />
        <div className={b('motto')}>
          Grand<br/> Chart
        </div>
      </div>
    );
  }
}

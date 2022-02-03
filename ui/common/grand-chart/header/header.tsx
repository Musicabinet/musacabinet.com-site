import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './header.module.sass';
import { RootStore, SystemStore } from '../../../../stores';
import { InstrumentIcon } from '../../instrument-icon/instrument-icon';
import { Modules } from './modules/modules';

const b = block(style);

type HeaderProps = {
  systemStore: SystemStore
};
type HeaderState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore
}))
@observer
export class Header extends React.Component<HeaderProps, HeaderState> {

  static defaultProps = {
    systemStore: {}
  };

  render() {
    const { systemStore } = this.props;

    return (
      <header className={b(null)}>
        <div className={b('logotype')}>
          <InstrumentIcon service={systemStore.service_name} icon={systemStore.instrument_icon} />
          <span className={b('name', { [systemStore.service_name]: true })}>Grand<br />Chart</span>
        </div>
        <Modules />
      </header>
    );
  }
}

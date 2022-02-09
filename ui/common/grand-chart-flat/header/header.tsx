import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './header.module.sass';
import { InstrumentIcon } from '../../instrument-icon/instrument-icon';
import { Modules } from './modules/modules';
import { SERVICE_NAME } from '../../../../constants';
import { getIconFromInstrumentId } from '../../../../helpers';
import { GrandChartFlatStore } from '../../../../stores';

const b = block(style);

type HeaderProps = {
  serviceName: SERVICE_NAME;
  instrument_id: number;
  grandChart: GrandChartFlatStore;
};
type HeaderState = {};

@inject(() => ({}))
@observer
export class Header extends React.Component<HeaderProps, HeaderState> {

  static defaultProps = {};

  render() {
    const { serviceName, instrument_id, grandChart } = this.props;

    return (
      <header className={b(null)}>
        <div className={b('logotype')}>
          <InstrumentIcon service={serviceName} icon={getIconFromInstrumentId(instrument_id)} />
          <span className={b('name', { [serviceName]: true })}>Grand<br />Chart</span>
        </div>
        <Modules serviceName={serviceName} grandChart={grandChart} />
      </header>
    );
  }
}

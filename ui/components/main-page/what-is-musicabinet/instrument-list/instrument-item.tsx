import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instrument-list.module.sass';
import { getIcon } from '../../../../common/icons';
import { InstrumentStore } from '../../../../../stores';

const b = block(style);

type InstrumentItemProps = {
  instrument: InstrumentStore;
  last: boolean;
};
type InstrumentItemState = {};

@inject(() => ({}))
@observer
export class InstrumentItem extends React.Component<InstrumentItemProps, InstrumentItemState> {
  render() {
    const { instrument, last } = this.props;
    return (
      <div className="col-lg-4 g-lg-0">
        <div className={b('item', { last })}>
          {getIcon(instrument.icon, b('icon'))}
          <div className={b('title')}>{instrument.name}</div>
        </div>
      </div>
    );
  }
}

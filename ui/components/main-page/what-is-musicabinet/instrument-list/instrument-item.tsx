import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instrument-list.module.sass';
import { InstrumentI } from '../../../../../interfaces';
import { getIcon } from '../../../../common/icons';

const b = block(style);

type InstrumentItemProps = {
  last: boolean
};
type InstrumentItemState = {};

@inject(() => ({}))
@observer
export class InstrumentItem extends React.Component<InstrumentItemProps & InstrumentI, InstrumentItemState> {
  render() {
    const { icon, name, last } = this.props;
    return (
      <div className='col-lg-4 g-lg-0'>
        <div className={b('item', { last })}>
          {getIcon(icon, b('icon'))}
          <div className={b('title')}>{name}</div>
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instruments-name.module.sass';
import { InstrumentI } from '../../../../interfaces';

const b = block(style);

type InstrumentItemProps = {
  selected: boolean
};
type InstrumentItemState = {};

@inject(() => ({}))
@observer
export class InstrumentItem extends React.Component<InstrumentItemProps & InstrumentI, InstrumentItemState> {
  render() {
    const { name, selected } = this.props;

    return (
      <button className={b('button', { selected })}>{name}</button>
    );
  }
}

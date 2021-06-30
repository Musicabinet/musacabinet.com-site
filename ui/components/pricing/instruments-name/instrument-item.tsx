import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instruments-name.module.sass';
import { InstrumentI } from '../../../../interfaces';
import { LIST_ICON } from '../../../common/icons';

const b = block(style);

type InstrumentItemProps = {
  selected: boolean,
  onSetInstrument: (value: LIST_ICON) => void
};
type InstrumentItemState = {};

@inject(() => ({}))
@observer
export class InstrumentItem extends React.Component<InstrumentItemProps & InstrumentI, InstrumentItemState> {

  handleOnChange = () => {
    const { icon, onSetInstrument } = this.props;
    onSetInstrument(icon);
  };

  render() {
    const { name, selected } = this.props;

    return (
      <button className={b('button', { selected })}
              onClick={this.handleOnChange}>{name}</button>
    );
  }
}

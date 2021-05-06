import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instrument-list.module.sass';
import { RootStore } from '../../../../../stores';

const b = block(style);

type InstrumentItemProps = {};
type InstrumentItemState = {};

@inject((store: RootStore) => ({}))
@observer
export class InstrumentItem extends React.Component<InstrumentItemProps, InstrumentItemState> {
  render() {
    return (
      <div className={b('item')}>instrument</div>
    );
  }
}

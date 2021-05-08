import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instrument-view.module.sass';

const b = block(style);

type InstrumentViewProps = {
};
type InstrumentViewState = {};

@inject(() => ({
}))
@observer
export class InstrumentView extends React.Component<InstrumentViewProps, InstrumentViewState> {

  static defaultProps = {
  }

  render() {
    return (
      <div className={b(null)}>
        <div className={b('container')}>
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instrument-view.module.sass';
import { FirstBlock } from './first-block/first-block';
import SecondBlock from './second-block/second-block';
import { ThirdBlock } from './third-block/third-block';
import { FourthBlock } from './fourth-block/fourth-block';
import { FifthBlock } from './fifth-block/fifth-block';

const b = block(style);

type InstrumentViewProps = {};
type InstrumentViewState = {};

@inject(() => ({}))
@observer
export class InstrumentView extends React.Component<InstrumentViewProps, InstrumentViewState> {

  static defaultProps = {};

  render() {
    return (
      <div className={b(null)}>
        <div className={b('container')}>
          <FirstBlock />
          <SecondBlock />
          <ThirdBlock />
          <FourthBlock />
          <FifthBlock />
        </div>
      </div>
    );
  }
}

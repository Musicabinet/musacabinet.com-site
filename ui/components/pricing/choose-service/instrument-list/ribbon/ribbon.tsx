import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './ribbon.module.sass';
import { RootStore } from '../../../../../../stores';

const b = block(style);

type RibbonProps = {};
type RibbonState = {};

@inject((store: RootStore) => ({}))
@observer
export class Ribbon extends React.Component<RibbonProps, RibbonState> {
  render() {
    return (
      <div className={b(null)}>
        <div className={b('text')}>
          Grand Opening Discount
        </div>
        <div className={b('discount')}>
          25% OFF
        </div>
      </div>
    );
  }
}

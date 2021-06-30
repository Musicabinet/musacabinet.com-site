import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './pricing.module.sass';
import { Instruments } from './instruments/instruments';
import { InstrumentsName } from './instruments-name/instruments-name';
import { Types } from './types/types';
import { List } from './list/list';

const b = block(style);

type PricingProps = {};
type PricingState = {};

@inject(() => ({}))
@observer
export class Pricing extends React.Component<PricingProps, PricingState> {
  render() {
    return (
      <div className={b(null)}>
        <Instruments />
        <InstrumentsName />
        <Types />
        <List />
      </div>
    );
  }
}

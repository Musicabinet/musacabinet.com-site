import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './pricing.module.sass';
import { ChooseService } from './choose-service/choose-service';
import { Payment } from './payment/payment';

const b = block(style);

type PricingProps = {};
type PricingState = {};

@inject(() => ({}))
@observer
export class Pricing extends React.Component<PricingProps, PricingState> {
  render() {
    return (
      <div className={b(null)}>
        <ChooseService />
        <Payment />
      </div>
    );
  }
}

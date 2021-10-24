import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './check-pay.module.sass';
import { RootStore } from '../../../../stores';
import { PricingStore } from '../../../../stores/pricing';
import { SystemStore } from '../../../../stores/system';

const b = block(style);

type CheckPayProps = {
  systemStore: SystemStore;
  pricingStore: PricingStore;
};
type CheckPayState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  pricingStore: store.pricingStore
}))
@observer
export class CheckPay extends React.Component<CheckPayProps, CheckPayState> {
  static defaultProps = {
    systemStore: {},
    pricingStore: {}
  };

  async componentDidUpdate() {
    if (this.props.pricingStore.disabledScreen) {
    }
  }

  render() {
    const { pricingStore } = this.props;

    return (
      <div
        className={b(null, {
          show: pricingStore.disabledScreen
        })}
      >
        <div className={b('message')}>
          Please wait while your transaction is being processed. <br />
          <b>Do not close or leave this page until the process is complete</b>.
        </div>
      </div>
    );
  }
}

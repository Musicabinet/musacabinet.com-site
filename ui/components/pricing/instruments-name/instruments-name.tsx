import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instruments-name.module.sass';
import { RootStore, PricingStore, ServicesStore } from '../../../../stores';
import { InstrumentItem } from './instrument-item';

const b = block(style);

type InstrumentsNameProps = {
  priceStore: PricingStore;
  servicesStore: ServicesStore,
};
type InstrumentsNameState = {};

@inject((store: RootStore) => ({
  priceStore: store.pricingStore,
  servicesStore: store.servicesStore
}))
@observer
export class InstrumentsName extends React.Component<InstrumentsNameProps, InstrumentsNameState> {
  static defaultProps = {
    priceStore: {},
    servicesStore: {}
  };

  render() {
    const { priceStore, servicesStore } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className={b(null)}>
              {servicesStore.instruments.map((instrument) => {
                return (
                  <InstrumentItem
                    key={instrument.id}
                    {...instrument}
                    selected={instrument.icon === priceStore.selected_instrument_icon}
                    onSetInstrument={priceStore.setSelectedInstrumentIcon}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

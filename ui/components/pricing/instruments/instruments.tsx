import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instruments.module.sass';
import { PricingStore, RootStore, ServicesStore } from '../../../../stores';
import { InstrumentItem } from './instrument-item';

const b = block(style);

type InstrumentsProps = {
  serviceStore: ServicesStore;
  pricingStore: PricingStore;
};
type InstrumentsState = {};

@inject((store: RootStore) => ({
  serviceStore: store.servicesStore,
  pricingStore: store.pricingStore,
}))
@observer
export class Instruments extends React.Component<InstrumentsProps, InstrumentsState> {
  static defaultProps = {
    serviceStore: {},
    pricingStore: {}
  };

  render() {
    const { serviceStore, pricingStore } = this.props;

    return (
      <div className={b(null)}>
        <div className='container'>
          <div className='row position-relative'>
            {serviceStore.instruments.map((instrument) => {

              return (
                <InstrumentItem
                  key={instrument.id}
                  {...instrument}
                  selected={instrument.icon === pricingStore.selected_instrument_icon}
                  onSetInstrument={pricingStore.setSelectedInstrumentIcon}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

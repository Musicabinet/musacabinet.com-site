import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instruments-name.module.sass';
import { RootStore } from '../../../../stores';
import { InstrumentI } from '../../../../interfaces';
import { InstrumentItem } from './instrument-item';
import { LIST_ICON } from '../../../common/icons';

const b = block(style);

type InstrumentsNameProps = {
  list: InstrumentI[],
  selected_instrument_icon: LIST_ICON,
  onSetInstrument: (value: LIST_ICON) => void
};
type InstrumentsNameState = {};

@inject((store: RootStore) => ({
  list: store.servicesStore.instruments,
  selected_instrument_icon: store.pricingStore.selected_instrument_icon,
  onSetInstrument: store.pricingStore.setSelectedInstrumentIcon
}))
@observer
export class InstrumentsName extends React.Component<InstrumentsNameProps, InstrumentsNameState> {

  static defaultProps = {
    list: [],
    selected_instrument_icon: LIST_ICON.GUITAR,
    onSetInstrument: () => console.log('Not set handler')
  };

  render() {
    const { list, selected_instrument_icon, onSetInstrument } = this.props;

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className={b(null)}>
              {list.map((instrument) => {
                return (<InstrumentItem key={instrument.id}
                                        {...instrument}
                                        selected={instrument.icon === selected_instrument_icon}
                                        onSetInstrument={onSetInstrument} />);
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

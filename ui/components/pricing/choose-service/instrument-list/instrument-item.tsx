import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instrument-list.module.sass';
import { RootStore } from '../../../../../stores';
import { InstrumentI } from '../../../../../interfaces';
import { InstrumentIcon } from '../../../../common';
import { SERVICE_NAME } from '../../../../../constants';

const b = block(style);

type InstrumentItemProps = {
  service_name: SERVICE_NAME,
  selected_instrument: string,
  onSetInstrument: (instrument: string) => void
};
type InstrumentItemState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  selected_instrument: store.pricingStore.selected_instrument,
  onSetInstrument: store.pricingStore.setInstrument
}))
@observer
export class InstrumentItem extends React.Component<InstrumentItemProps & InstrumentI, InstrumentItemState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    selected_instrument: '',
    onSetInstrument: () => console.log('Not set handler')
  };

  handleOnSetInstrument = () => {
    const { name, onSetInstrument } = this.props;
    onSetInstrument(name.toLowerCase());
  };

  render() {
    const { icon, service_name, is_active, selected_instrument, name } = this.props;

    return (
      <>
        <button disabled={!is_active}
                className={b('item', { is_active: selected_instrument === name.toLowerCase() && is_active })}
                onClick={this.handleOnSetInstrument}>
          <InstrumentIcon icon={icon} service={service_name} />
        </button>
      </>
    );
  }
}

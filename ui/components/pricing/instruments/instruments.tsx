import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instruments.module.sass';
import { RootStore } from '../../../../stores';
import { InstrumentI } from '../../../../interfaces';
import { InstrumentItem } from './instrument-item';
import { LIST_ICON } from '../../../common/icons';

const b = block(style);

type InstrumentsProps = {
  list: InstrumentI[]
};
type InstrumentsState = {};

@inject((store: RootStore) => ({
  list: store.servicesStore.instruments
}))
@observer
export class Instruments extends React.Component<InstrumentsProps, InstrumentsState> {

  static defaultProps = {
    list: []
  };

  render() {
    const { list } = this.props;

    return (
      <div className={b(null)}>
        <div className='container'>
          <div className='row'>
            {list.map((instrument) => {
              return (<InstrumentItem key={instrument.id} {...instrument} selected={instrument.icon === LIST_ICON.KEYBOARD} />);
            })}
          </div>
        </div>
      </div>
    );
  }
}

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
  list: InstrumentI[]
};
type InstrumentsNameState = {};

@inject((store: RootStore) => ({
  list: store.servicesStore.instruments
}))
@observer
export class InstrumentsName extends React.Component<InstrumentsNameProps, InstrumentsNameState> {

  static defaultProps = {
    list: []
  };

  render() {
    const { list } = this.props;

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className={b(null)}>
              {list.map((instrument) => {
                return (<InstrumentItem key={instrument.id} {...instrument} selected={instrument.icon === LIST_ICON.KEYBOARD } />);
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

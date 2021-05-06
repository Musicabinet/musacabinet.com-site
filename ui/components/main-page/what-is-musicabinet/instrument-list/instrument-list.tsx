import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instrument-list.module.sass';
import { RootStore } from '../../../../../stores';
import { InstrumentStore } from '../../../../../stores/instrument';

const b = block(style);

type InstrumentListProps = {
  list: InstrumentStore[]
};
type InstrumentListState = {};

@inject((store: RootStore) => ({
  list: store.instrumentsStore.all
}))
@observer
export class InstrumentList extends React.Component<InstrumentListProps, InstrumentListState> {

  static defaultProps = {
    list: []
  };


  render() {
    const { list } = this.props;

    return (
      <div className={b(null)}>
        <div className='container'>
          <div className='row'>
            {list.map((instrument)=>{
              return
            })}
          </div>
        </div>
      </div>
    );
  }
}

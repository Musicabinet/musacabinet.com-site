import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './list.module.sass';
import { RootStore } from '../../../../stores';

const b = block(style);

type ListProps = {};
type ListState = {};

@inject((store: RootStore) => ({
  list: store.pricingStore
}))
@observer
export class List extends React.Component<ListProps, ListState> {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className={b(null)}>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

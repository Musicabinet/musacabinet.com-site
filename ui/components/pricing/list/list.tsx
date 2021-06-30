import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './list.module.sass';
import { RootStore } from '../../../../stores';
import { ServiceI } from '../../../../interfaces';
import { Item } from './item';

const b = block(style);

type ListProps = {
  list: ServiceI[]
};
type ListState = {};

@inject((store: RootStore) => ({
  list: store.servicesStore.all
}))
@observer
export class List extends React.Component<ListProps, ListState> {

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
              {list.map((service) => {
                // @ts-ignore
                return <Item key={service.id} {...service}  />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

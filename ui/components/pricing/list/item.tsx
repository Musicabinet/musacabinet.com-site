import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './list.module.sass';
import { ServiceI } from '../../../../interfaces';
import { InstrumentIcon } from '../../../common';
import { LIST_ICON } from '../../../common/icons';
import { RootStore } from '../../../../stores';

const b = block(style);

type ItemProps = {
  information: any
};
type ItemState = {};

@inject((store: RootStore) => ({
  information: store.pricingStore.information
}))
@observer
export class Item extends React.Component<ItemProps & ServiceI, ItemState> {
  render() {
    const { slug, information } = this.props;
    const service_name = slug;
;

    return (
      <div className={b('item')}>
        <div className={b('icon')}>
          {/*
           // @ts-ignore */}
          <InstrumentIcon icon={service_name.toUpperCase() as LIST_ICON} service={'white'} />
        </div>
        <div className={b('name')}>{slug}</div>
        <div className={b('description')}>{information[service_name].title}</div>
        <div className={b('error')}>
          Error. Not found price
        </div>
      </div>
    );
  }
}

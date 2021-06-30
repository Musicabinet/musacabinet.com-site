import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './list.module.sass';
import { ServiceI } from '../../../../interfaces';
import { InstrumentIcon } from '../../../common';
import { LIST_ICON } from '../../../common/icons';

const b = block(style);

type ItemProps = {};
type ItemState = {};

@inject(() => ({}))
@observer
export class Item extends React.Component<ItemProps & ServiceI, ItemState> {
  render() {
    const { slug } = this.props;

    return (
      <div className={b('item')}>
        <div className={b('icon')}>
          {/*
           // @ts-ignore */}
          <InstrumentIcon icon={slug.toUpperCase() as LIST_ICON} service={'white'} />
        </div>
        <div className={b('name')}>{slug}</div>
        <div className={b('error')}>
          Error. Not found price
        </div>
      </div>
    );
  }
}

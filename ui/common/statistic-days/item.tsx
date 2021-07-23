import * as React from 'react';
import {inject, observer} from 'mobx-react';
import block from 'bem-css-modules';
import style from "./statistic-days.module.sass";

const b = block(style);

type ItemProps = {};
type ItemState = {};

@inject(() => ({}))
@observer
export default class Item extends React.Component<ItemProps, ItemState> {
  render() {
    return (
      <div className={b('item')}>
        Stats are abailable on paid subscriptions only. Apologies for an inconvenience.
      </div>
    );
  }
}

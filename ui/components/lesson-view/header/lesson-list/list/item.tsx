import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './list.module.sass';

const b = block(style);

type ItemProps = {
  active: boolean;
  uuid: string;
  name: string;
  onLink: (uuid: string) => void;
};
type ItemState = {};

@inject(() => ({}))
@observer
export class Item extends React.Component<ItemProps, ItemState> {
  handleOnLink = () => {
    const { uuid, onLink } = this.props;
    onLink(uuid);
  };

  render() {
    const { name, active } = this.props;

    return (
      <div onClick={this.handleOnLink} className={b('item', { active })}>
        {name}
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './header.module.sass';
import { Icon } from './icon/icon';

const b = block(style);

type HeaderProps = {};
type HeaderState = {};

@inject(() => ({}))
@observer
export class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    return <div className={b(null)}>

      <Icon />

    </div>;
  }
}

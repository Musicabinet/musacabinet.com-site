import * as React from 'react';
import block from 'bem-css-modules';
import style from './cabinet-menu.module.sass';
import Link from 'next/link';
import { MenuI } from '../../../interfaces';

const b = block(style);

type CabinetMenuItemProps = {};
type CabinetMenuItemState = {};

export class CabinetMenuItem extends React.Component<CabinetMenuItemProps & MenuI, CabinetMenuItemState> {
  render() {
    const { title, is_active, link } = this.props;

    return <li className={b('item')}>
      <Link href={link}><a className={b('link', { is_active })}>{title}</a></Link>
    </li>;
  }
}

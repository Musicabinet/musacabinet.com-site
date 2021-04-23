import * as React from 'react';
import block from 'bem-css-modules';
import style from './menu.module.sass';
import { MenuI } from '../../../interfaces';
import Link from 'next/link';

const b = block(style);

type MenuItemProps = {};
type MenuItemState = {};

export class MenuItem extends React.Component<MenuItemProps & MenuI, MenuItemState> {

  renderChildren = (children: MenuI[] = [], root = false) => {
    if (children.length === 0) {
      return null;
    }

    return (<ul className={b('submenu', { root })}>
      {children.map(({ link, type, title, children: childChildren }) => {
        return (
          <li key={`${link}_${type}`} className={b('item')}>
            <Link href={`/${link}`}>
              <a className={b('link', { type })}>{title}</a>
            </Link>
            {this.renderChildren(childChildren)}
          </li>
        );
      })}
    </ul>);
  };

  render() {
    const { title, link, type, children } = this.props;

    return (
      <li className={b('item')}>
        <Link href={`/${link}`}>
          <a className={b('link', { type })}>{title}</a>
        </Link>
        {this.renderChildren(children, true)}
      </li>
    );
  }
}

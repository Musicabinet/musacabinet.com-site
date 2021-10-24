import * as React from 'react';
import block from 'bem-css-modules';
import style from './menu.module.sass';
import { MenuI } from '../../../interfaces';
import Router from 'next/router';
import Link from 'next/link';

const b = block(style);

type MenuItemProps = {
  onCloseMobile: () => void;
};
type MenuItemState = {};

export class MenuItem extends React.Component<MenuItemProps & MenuI, MenuItemState> {
  handleOnClick = async (link: string) => {
    const { onCloseMobile } = this.props;
    await Router.push(`/${link}`);
    onCloseMobile();
  };

  renderChildren = (children: MenuI[] = [], root = false) => {
    if (children.length === 0) {
      return null;
    }

    return (
      <ul className={b('submenu', { root })}>
        {children.map(({ link, type, title, children: childChildren }) => {
          return (
            <li key={`${link}_${type}`} className={b('item')}>
              <a onClick={() => this.handleOnClick(link)} className={b('link', { type })}>
                {title}
              </a>
              {this.renderChildren(childChildren)}
            </li>
          );
        })}
      </ul>
    );
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

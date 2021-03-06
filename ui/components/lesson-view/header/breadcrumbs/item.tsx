import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './breadcrumbs.module.sass';
import { BreadcrumbsI } from '../../../../../interfaces';
import { ucFirst } from '../../../../../helpers';

const b = block(style);

type BreadcrumbsItemProps = {
  current: number;
  total: number;
};
type BreadcrumbsItemState = {};

@inject(() => ({}))
@observer
export class BreadcrumbsItem extends React.Component<BreadcrumbsItemProps & BreadcrumbsI, BreadcrumbsItemState> {
  render() {
    const { type, name, current, total } = this.props;

    return (
      <span className={b('item')}>
        {current === 1 ? <span className={b('first')}>/</span> : null}
        {current < total ? (
          <span>
            {type} : <span className={b('color')}>{ucFirst(name).replace(/[0-9]./g, '')}</span>
          </span>
        ) : (
          <span className={b('color')}>{name}</span>
        )}
        {current < total ? '\u00A0 / \u00A0' : null}
      </span>
    );
  }
}

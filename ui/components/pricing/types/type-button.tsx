import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './types.module.sass';
import { ucFirst } from '../../../../helpers';

const b = block(style);

type TypeButtonProps = {};
type TypeButtonState = {};

@inject(() => ({}))
@observer
export class TypeButton extends React.Component<TypeButtonProps, TypeButtonState> {
  render() {
    const { children } = this.props;

    return (
      <button className={b('button')}>{ucFirst(String(children))}</button>
    );
  }
}

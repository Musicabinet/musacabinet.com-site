import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './types.module.sass';
import { ucFirst } from '../../../../helpers';
import { TERM_LIST } from '../../../../interfaces';

const b = block(style);

type TypeButtonProps = {
  selected: boolean,
  onSetTerm: (value: TERM_LIST) => void
};
type TypeButtonState = {};

@inject(() => ({}))
@observer
export class TypeButton extends React.Component<TypeButtonProps, TypeButtonState> {

  handleOnChange = () => {
    const { children, onSetTerm } = this.props;
    onSetTerm(children as TERM_LIST);
  };

  render() {
    const { children, selected } = this.props;

    return (
      <button className={b('button', { selected })}
              onClick={this.handleOnChange}>{ucFirst(String(children))}</button>
    );
  }
}

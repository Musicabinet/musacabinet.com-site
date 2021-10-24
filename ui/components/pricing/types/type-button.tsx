import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './types.module.sass';
import { ucFirst } from '../../../../helpers';
import { PRODUCT_DURATION } from '../../../../interfaces';

const b = block(style);

type TypeButtonProps = {
  selected: boolean;
  onSetProductDuration: (value: PRODUCT_DURATION) => void;
};
type TypeButtonState = {};

@inject(() => ({}))
@observer
export class TypeButton extends React.Component<TypeButtonProps, TypeButtonState> {
  handleOnChange = () => {
    const { children, onSetProductDuration } = this.props;
    onSetProductDuration(children as PRODUCT_DURATION);
  };

  render() {
    const { children, selected } = this.props;

    return (
      <button className={b('button', { selected })}
              onClick={this.handleOnChange}>
        {ucFirst(String(children))}
      </button>
    );
  }
}

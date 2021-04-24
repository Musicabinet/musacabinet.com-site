import * as React from 'react';
import block from 'bem-css-modules';
import style from './button.module.sass';

const b = block(style);

type ButtonProps = {
  type: 'button' | 'submit',
  name: string,
  loading: boolean,
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void,
  disabled: boolean,
  className: string,
  full: boolean
};
type ButtonState = {};

export class Button extends React.Component<ButtonProps, ButtonState> {

  static defaultProps = {
    className: '',
    name: '',
    type: 'button',
    loading: false,
    disabled: false,
    full: false,
    onClick: () => console.log('Not set handler')
  };

  render() {
    const { children, className, type, disabled, full, onClick } = this.props;

    return (
      <button type={type}
              disabled={disabled}
              className={` ${className} ${b(null, { full })}`}
              onClick={onClick}>{children}</button>
    );
  }
}

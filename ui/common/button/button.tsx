import * as React from 'react';
import block from 'bem-css-modules';
import style from './button.module.sass';

const b = block(style);

type ButtonProps = {
  name: string,
  loading: boolean,
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void,
  disabled?: boolean,
  className: string
};
type ButtonState = {};

export class Button extends React.Component<ButtonProps, ButtonState> {

  static defaultProps = {
    className: '',
    onClick: () => console.log('Not set handler')
  };

  render() {
    const { children, className, onClick } = this.props;

    return (
      <button className={` ${className} ${b(null)}`}
              onClick={onClick}>{children}</button>
    );
  }
}

import * as React from 'react';
import block from 'bem-css-modules';
import style from './title.module.sass';
import { TITLE_SIZE } from '../../../constants';

const b = block(style);

type TitleProps = {
  size: TITLE_SIZE,
  className: string
};
type TitleState = {};

export class Title extends React.Component<TitleProps, TitleState> {

  static defaultProps = {
    size: TITLE_SIZE.THIRD,
    className: ''
  };

  render() {
    const { size, className, children } = this.props;
    return <div className={`${b(null, { [size]: true })} ${className}`}>{children}</div>;
  }
}

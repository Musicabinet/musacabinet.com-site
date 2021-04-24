import * as React from 'react';
import block from 'bem-css-modules';
import style from './hr-with-text.module.sass';

const b = block(style);

type HrWithTextProps = {};
type HrWithTextState = {};

export class HrWithText extends React.Component<HrWithTextProps, HrWithTextState> {
  render() {
    const { children } = this.props;

    return <div className={b(null)}>
      <span>{children}</span>
    </div>;
  }
}

import * as React from 'react';
import block from 'bem-css-modules';
import style from './divider.module.sass';

const b = block(style);

type DividerProps = {};
type DividerState = {};

export class Divider extends React.Component<DividerProps, DividerState> {
  render() {
    return <div className={b(null)} />;
  }
}

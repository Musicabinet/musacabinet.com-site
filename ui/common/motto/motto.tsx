import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './motto.module.sass';

const b = block(style);

type MottoProps = {};
type MottoState = {};

@inject(() => ({}))
@observer
export class Motto extends React.Component<MottoProps, MottoState> {
  render() {
    return (
      <div className={b(null)}>
        If you’re serious about education
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './toolbar.module.sass';
import { PlusButton } from './plus-button';
import { Accompaniments } from './accompaniments/accompaniments';

const b = block(style);

type ToolbarProps = {};
type ToolbarState = {};

@inject(() => ({}))
@observer
export class Toolbar extends React.Component<ToolbarProps, ToolbarState> {
  render() {
    return (
      <div className={b(null)}>
        <PlusButton />
        <Accompaniments />
      </div>
    );
  }
}

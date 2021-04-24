import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './modules.module.sass';
import { ModuleI } from '../../../../../interfaces';

const b = block(style);

type ModuleItemProps = {};
type ModuleItemState = {};

@inject(() => ({}))
@observer
export class ModuleItem extends React.Component<ModuleItemProps & ModuleI, ModuleItemState> {
  render() {
    const { name } = this.props;

    return (
      <div className={b('item')}>
        {name}
      </div>
    );
  }
}

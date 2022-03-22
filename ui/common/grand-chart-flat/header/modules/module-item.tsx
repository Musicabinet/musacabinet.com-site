import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './modules.module.sass';
import { ModuleStore } from '../../../../../stores/module';
import { SERVICE_NAME } from '../../../../../constants';

const b = block(style);

type ModuleItemProps = {
  isActive: boolean;
  serviceName: SERVICE_NAME;
  module: ModuleStore;
};
type ModuleItemState = {};

@inject(() => ({}))
@observer
export class ModuleItem extends React.Component<ModuleItemProps, ModuleItemState> {
  render() {
    const { isActive, module, serviceName } = this.props;

    return (
      <div className={b('item', { [serviceName]: true, isActive })}>
        <span className={b('toolbar')}>Module {module.number_module}</span>
        <span className={b('name')}>{module.nameWithoutNumber}</span>
      </div>
    );
  }
}

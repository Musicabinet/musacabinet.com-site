import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './modules.module.sass';
import { ModuleStore } from '../../../../../stores/module';
import { RootStore, SystemStore } from '../../../../../stores';

const b = block(style);

type ModuleItemProps = {
  module: ModuleStore,
  systemStore: SystemStore
};
type ModuleItemState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore
}))
@observer
export class ModuleItem extends React.Component<ModuleItemProps, ModuleItemState> {

  static defaultProps = {
    systemStore: {}
  };

  render() {
    const { module, systemStore } = this.props;

    return (
      <div className={b('item', { [systemStore.service_name]: true })}>
        <span className={b('toolbar')}>{module.nameModule}</span>
        <span className={b('name')}>{module.nameWithoutNumber}</span>
      </div>
    );
  }
}

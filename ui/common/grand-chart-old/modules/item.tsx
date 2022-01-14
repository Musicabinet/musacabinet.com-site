import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './item.module.sass';
import { ModuleI } from '../../../../interfaces';
import { SERVICE_NAME } from '../../../../constants';
import { RootStore } from '../../../../stores';

const b = block(style);

type ModuleItemProps = {
  module: ModuleI;
  service_name: SERVICE_NAME;
  is_active: boolean;
  number: number;
};
type ModuleItemState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name
}))
@observer
export class ModuleItem extends React.Component<ModuleItemProps, ModuleItemState> {
  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL
  };

  render() {
    const { module, service_name, number, is_active } = this.props;

    return (
      <div className={b(null)}>
        <div className={b('toolbar', { [service_name]: !is_active })}>Module {number}</div>
        {module.name.replace(/[0-9]./g, '')}
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './modules.module.sass';
import { ModuleI } from '../../../../interfaces';
import { SERVICE_NAME } from '../../../../constants';
import { RootStore } from '../../../../stores';

const b = block(style);

type ModuleItemProps = {
  is_active: boolean,
  number: number,
  service_name: SERVICE_NAME,
};
type ModuleItemState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name
}))
@observer
export class ModuleItem extends React.Component<ModuleItemProps & ModuleI, ModuleItemState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL
  };

  render() {
    const { name, is_active, service_name, number } = this.props;

    return (
      <div className={b('item', { is_active })}>
        <div className={b('toolbar', { [service_name]: !is_active})}>Module {number}</div>
        {name.replace(/[0-9]./g, '')}
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './modules.module.sass';
import { RootStore } from '../../../../stores';
import { ModuleI } from '../../../../interfaces';
import { ModuleItem } from './item';
import { SERVICE_NAME } from '../../../../constants';

const b = block(style);

type ModulesProps = {
  service_name: SERVICE_NAME,
  selected_module_id: number,
  list: ModuleI[]
};
type ModulesState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  selected_module_id: store.systemStore.selected_module_id,
  list: store.grandChartStore.modules
}))
@observer
export class Modules extends React.Component<ModulesProps, ModulesState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    selected_module_id: 0,
    list: []
  };

  render() {
    const { list, service_name, selected_module_id } = this.props;

    console.log('render', list, list.length);

    return (
      <div className={b(null, { [service_name]: true })}>
        {list.map((module) => {
          return (
            <ModuleItem key={module.id}
                        id={module.id}
                        sort={module.sort}
                        name={module.name}
                        is_active={(selected_module_id === module.id)} />
          );
        })}
      </div>
    );
  }
}

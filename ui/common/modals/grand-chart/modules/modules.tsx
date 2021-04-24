import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './modules.module.sass';
import { RootStore } from '../../../../../stores';
import { ModuleI } from '../../../../../interfaces';
import { ModuleItem } from './item';

const b = block(style);

type ModulesProps = {
  service_name: string,
  list: ModuleI[]
};
type ModulesState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  list: store.grandChartStore.modules
}))
@observer
export class Modules extends React.Component<ModulesProps, ModulesState> {

  static defaultProps = {
    service_name: '',
    list: []
  };

  render() {
    const { list, service_name } = this.props;

    return (
      <div className={b(null, { [service_name]: true })}>
        {list.map((module) => {
          return (
            <ModuleItem key={module.id}
                        id={module.id}
                        sort={module.sort}
                        name={module.name}
                        is_active={module.is_active} />
          );
        })}
      </div>
    );
  }
}

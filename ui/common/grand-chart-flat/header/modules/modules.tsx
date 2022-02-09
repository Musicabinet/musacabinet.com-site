import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './modules.module.sass';
import { ModuleItem } from './module-item';
import { GrandChartFlatStore } from '../../../../../stores';
import { SERVICE_NAME } from '../../../../../constants';

const b = block(style);

type ModulesProps = {
  serviceName: SERVICE_NAME;
  grandChart: GrandChartFlatStore;
};
type ModulesState = {};

@inject(() => ({}))
@observer
export class Modules extends React.Component<ModulesProps, ModulesState> {

  render() {
    const { grandChart, serviceName } = this.props;

    return (
      <div className={b(null)}
           style={{
             gridTemplateColumns: `repeat(${grandChart.modules.length}, 220px)`
           }}>
        {grandChart.modules.map((module) => {
          return <ModuleItem key={module.id}
                             serviceName={serviceName}
                             module={module}
                             isActive={module.id === grandChart.selected_module_id} />;
        })}
      </div>
    );
  }

}

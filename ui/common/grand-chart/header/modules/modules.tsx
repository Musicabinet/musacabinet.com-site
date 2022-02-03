import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './modules.module.sass';
import { GrandChartStore, RootStore } from '../../../../../stores';
import { ModuleItem } from './module-item';

const b = block(style);

type ModulesProps = {
  grandChartStore: GrandChartStore
};
type ModulesState = {};

@inject((store: RootStore) => ({
  grandChartStore: store.grandChartStore
}))
@observer
export class Modules extends React.Component<ModulesProps, ModulesState> {

  static defaultProps = {
    grandChartStore: {}
  };

  render() {
    const { grandChartStore } = this.props;

    return (
      <div className={b(null)}
           style={{
             gridTemplateColumns: `repeat(${grandChartStore.modules.length}, 220px)`
           }}>
        {grandChartStore.modules.map((module) => {
          return <ModuleItem key={module.id} module={module} />;
        })}
      </div>
    );
  }

}

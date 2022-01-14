import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './grand-chart.module.sass';
import { GrandChartStore, RootStore, SystemStore } from '../../../stores';
import { Logotype } from './logotype/logotype';

const b = block(style);

type GrandChartProps = {
  grandChartStore: GrandChartStore,
  systemStore: SystemStore,
  is_transparent: boolean;
};
type GrandChartState = {};

@inject((store: RootStore) => ({
  grandChartStore: store.grandChartStore,
  systemStore: store.systemStore
}))
@observer
export class GrandChart extends React.Component<GrandChartProps, GrandChartState> {
  static defaultProps = {
    grandChartStore: {},
    systemStore: {},
    is_transparent: false
  };

  componentWillUnmount() {

  }

  render() {
    const { grandChartStore, systemStore, is_transparent } = this.props;

    if (!systemStore.service_name) {
      return null;
    }

    return (
      <div className={b(null, { is_transparent, loading: grandChartStore.isFetch, isEmpty: grandChartStore.isEmpty })}>
        <div className={b('header')}>
          <Logotype/>
        </div>
        <div className={b('body')}>

        </div>
      </div>
    );
  }
}

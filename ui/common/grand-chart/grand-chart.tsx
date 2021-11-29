import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './grand-chart.module.sass';
import { GrandChartStore, RootStore, SystemStore } from '../../../stores';
import { Modules } from './modules/modules';
import { Courses } from './courses/courses';
import { GroupLessons } from './group-lessons/group-lessons';
import { GroupLessonView } from './group-lesson-view/group-lesson-view';
import { InstrumentIcon } from '../instrument-icon/instrument-icon';

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
        <header className={b('header')}>
          <div className={b('logotype')}>
            <InstrumentIcon service={systemStore.service_name} icon={systemStore.instrument_icon} />
            <div
              className={b('name', {
                [systemStore.service_name]: true
              })}
            >
              Grand
              <br /> Chart
            </div>
          </div>
          <Modules />
        </header>

        <div className={b('container')}>
          <div
            className={b('gold-line', {
              isFetch: grandChartStore.isFetch,
              show: !grandChartStore.isFetch /*&& systemStore.service_name === 'college' && systemStore.instrument_icon === LIST_ICON.GUITAR*/
            })}
          />
          <div className={b('sidebar')}>
            <Courses />
          </div>
          <div className={b('content')}>
            <GroupLessonView />
            <GroupLessons />
          </div>
        </div>
      </div>
    );
  }
}

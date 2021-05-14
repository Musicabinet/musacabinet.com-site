import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './grand-chart.module.sass';
import { RootStore } from '../../../stores';
import { Modules } from './modules/modules';
import { Courses } from './courses/courses';
import { GroupLessons } from './group-lessons/group-lessons';
import { GroupLessonView } from './group-lesson-view/group-lesson-view';
import { SERVICE_NAME } from '../../../constants';
import { LIST_ICON } from '../icons';
import { InstrumentIcon } from '../instrument-icon/instrument-icon';

const b = block(style);

type GrandChartProps = {
  isFetch: boolean,
  isEmpty: boolean,
  service_name: SERVICE_NAME,
  instrument_icon: LIST_ICON.GUITAR | LIST_ICON.KEYBOARD | LIST_ICON.SAXOPHONE,
  is_transparent: boolean
};
type GrandChartState = {};

@inject((store: RootStore) => ({
  isFetch: store.grandChartStore.isFetch,
  isEmpty: store.grandChartStore.isEmpty,
  service_name: store.systemStore.service_name,
  instrument_icon: store.systemStore.instrument_icon
}))
@observer
export class GrandChart extends React.Component<GrandChartProps, GrandChartState> {

  static defaultProps = {
    isFetch: false,
    isEmpty: false,
    service_name: undefined,
    instrument_icon: '',
    is_transparent: false
  };

  componentWillUnmount() {
    console.log('unmount');
  }

  render() {
    const { isFetch, isEmpty, service_name, instrument_icon, is_transparent } = this.props;
    return (

      <div className={b(null, { is_transparent, loading: isFetch, isEmpty })}>
        <header className={b('header')}>
          <div className={b('logotype')}>
            <InstrumentIcon service={service_name} icon={instrument_icon} />
            <div className={b('name', {
              [service_name]: true
            })}>Grand<br /> Chart
            </div>
          </div>
          <Modules />
        </header>

        <div className={b('container')}>
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

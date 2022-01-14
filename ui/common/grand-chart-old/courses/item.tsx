import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './courses.module.sass';
import { CourseI } from '../../../../interfaces';
import { GrandChartStore, RootStore } from '../../../../stores';
import { SERVICE_NAME } from '../../../../constants';
import { StatisticsListStore } from '../../../../stores/statistics-list';

const b = block(style);

type CourseItemProps = {
  is_active: boolean;
  number: number;
  service_name: SERVICE_NAME;
  statisticsListStore: StatisticsListStore,
  grandChartStore: GrandChartStore
};
type CourseItemState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  statisticsListStore: store.statisticsListStore,
  grandChartStore: store.grandChartStore
}))
@observer
export class CourseItem extends React.Component<CourseItemProps & CourseI, CourseItemState> {
  circle = React.createRef<SVGSVGElement>();
  circleFill = React.createRef<SVGSVGElement>();

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    statisticsListStore: {},
    grandChartStore: {}
  };

  fillCirclePercent = () => {
    if (this.circle && this.circle.current) {
      this.circle.current.style.strokeDasharray = `${Math.ceil(this.getPassedPercent())} 113`;
    }
  };

  getPassedPercent() {
    const { id, statisticsListStore, grandChartStore } = this.props;
    const passedMinute = statisticsListStore.getCoursesPassedTotal[id] || 0;
    return (passedMinute * 100) / grandChartStore.totalTimeCollections[id];
  }

  render() {
    const { id, name, is_active, number, service_name } = this.props;
    this.fillCirclePercent();

    return (
      <div
        className={b('item', {
          is_active,
          [service_name]: true
        })}
      >
        <div className={b('toolbar', { [service_name]: !is_active })}>Course {number}</div>
        <span className={b('name')}>{name}</span>

        <div className={b('pie-container')}>
          <div className={b('percent')}>{Math.ceil(this.getPassedPercent())}%</div>
          <svg className={b('pie')} width={40} height={40} viewBox='0 0 40 40'>
            {/*
         // @ts-ignore */}
            <circle ref={this.circleFill}
                    className={b('fill')}
                    id='two'
                    strokeWidth={2}
                    r={18}
                    cx={20}
                    cy={20}
                    fill='transparent' />
            {/*
          // @ts-ignore */}
            <circle ref={this.circle}
                    className={b('circle')}
                    id={`id_${id}`}
                    strokeWidth={2}
                    r={18}
                    cx={20}
                    cy={20}
                    fill='transparent' />
          </svg>
        </div>

      </div>
    );
  }
}

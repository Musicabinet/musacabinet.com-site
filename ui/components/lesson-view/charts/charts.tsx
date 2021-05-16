import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './charts.module.sass';
import { RootStore } from '../../../../stores';
import { ChartI } from '../../../../interfaces/chart';
import { CHART_TYPE, SERVICE_NAME } from '../../../../constants';
import { ScoreI } from '../../../../interfaces';

const b = block(style);

type ChartsProps = {
  service_name: SERVICE_NAME,
  currentContentChart: ChartI | null,
  currentContentScore: ScoreI | null,
  currentSubTitleScore: string
};
type ChartsState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  currentContentChart: store.lessonStore.currentContentChart,
  currentContentScore: store.lessonStore.currentContentScore,
  currentSubTitleScore: store.lessonStore.currentSubTitleScore
}))
@observer
export class Charts extends React.Component<ChartsProps, ChartsState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    currentContentChart: null,
    currentContentScore: null,
    currentSubTitleScore: ''
  };

  render() {
    const { service_name, currentContentChart, currentContentScore } = this.props;


    return (
      <div className={b(null)}>
        {(currentContentChart && (
          <>
            {currentContentScore && (
              <div className={b('header')}>
                <div className={b('information')}>
                  <div className={b('title')}>{currentContentScore.name}</div>
                </div>
              </div>
            )}


            <div className={b('list', {
              college: (service_name === SERVICE_NAME.COLLEGE)
            })}>
              {currentContentChart.items.map((chart) => {
                if (chart.chart_type_id === CHART_TYPE.IMAGE) {
                  return (
                    <img key={chart.id}
                         className={b('image')}
                         src={`${CONTENT_URL}${chart.content.image}`} />
                  );
                }
              })}
            </div>
          </>
        ))}
      </div>
    );
  }
}

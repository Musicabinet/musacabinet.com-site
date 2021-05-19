import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './charts.module.sass';
import { RootStore } from '../../../../stores';
import { ChartI } from '../../../../interfaces/chart';
import { CHART_TYPE, MODALS, SERVICE_NAME } from '../../../../constants';
import { AccompanimentI, ScoreI } from '../../../../interfaces';

const b = block(style);

type ChartsProps = {
  service_name: SERVICE_NAME,
  currentContentChart: ChartI | null,
  currentContentScore: ScoreI | null,
  currentSubTitleScore: string,
  accompaniments: AccompanimentI[],
  onShowPreview: (chart_image_id: number) => void,
  onShowModal: (id_modal: MODALS) => void,
  onChooseAccompaniment: (id: number) => void,
  onLoadTrack: () => void
};
type ChartsState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  currentContentChart: store.lessonStore.currentContentChart,
  currentContentScore: store.lessonStore.currentContentScore,
  currentSubTitleScore: store.lessonStore.currentSubTitleScore,
  accompaniments: store.lessonStore.accompaniments,
  onShowPreview: store.lessonStore.showPreviewChart,
  onShowModal: store.modalsStore.show,
  onChooseAccompaniment: store.lessonStore.setAccompaniment,
  onLoadTrack: store.playerStore.loadTrack
}))
@observer
export class Charts extends React.Component<ChartsProps, ChartsState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    currentContentChart: null,
    currentContentScore: null,
    currentSubTitleScore: '',
    accompaniments: [],
    onShowPreview: () => console.log('Not set handler'),
    onShowModal: () => console.log('Not set handler'),
    onChooseAccompaniment: () => console.log('Not set handler'),
    onLoadTrack: () => console.log('Not set handler')
  };

  handleOnShow = (chart_image_id: number) => {
    const {
      currentContentChart, accompaniments, onShowPreview, onShowModal,
      onChooseAccompaniment, onLoadTrack
    } = this.props;

    onShowPreview(chart_image_id);
    onShowModal(MODALS.PREVIEW_CHART);

    // Получаем индекс выбранной партитуры
    const findIndex = currentContentChart?.items
      .filter((item) => item.chart_type_id === CHART_TYPE.IMAGE)
      .findIndex((chart) => chart.id === chart_image_id);

    if (findIndex) {
      if (accompaniments[findIndex]) {
        onChooseAccompaniment(accompaniments[findIndex].id);
        onLoadTrack();
      }
    }
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
                         src={`${CONTENT_URL}${chart.content.image}`}
                         onClick={this.handleOnShow.bind(null, chart.id)}  />
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

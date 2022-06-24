import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './charts.module.sass';
import { RootStore, SystemStore } from '../../../../stores';
import { CHART_TYPE, MODALS, SERVICE_NAME } from '../../../../constants';
import { LessonStore } from '../../../../stores';
import { PlayerStore } from '../../../../stores';
import { Pagination } from '../../../common/pagination/pagination';

const b = block(style);

type ChartsProps = {
  systemStore: SystemStore;
  onShowModal: (id_modal: MODALS) => void;
  onLoadTrack: () => void;
  lessonStore: LessonStore;
  playerStore: PlayerStore;
};
type ChartsState = {};

@inject((store: RootStore) => ({
  lessonStore: store.lessonStore,
  systemStore: store.systemStore,
  onShowModal: store.modalsStore.show,
  onLoadTrack: store.playerStore.loadTrack,
  //lessonStore: store.lessonStore,
  playerStore: store.playerStore
}))
@observer
export class Charts extends React.Component<ChartsProps, ChartsState> {
  static defaultProps = {
    systemStore: {},
    lessonStore: {},
    playerStore: {},
    onShowModal: () => console.log('Not set handler'),
    onLoadTrack: () => console.log('Not set handler')
  };

  handleOnShow = (chart_image_id: number) => {
    const { onShowModal, lessonStore, playerStore } = this.props;

    lessonStore.showPreviewChart(chart_image_id);
    onShowModal(MODALS.PREVIEW_CHART);

    const selected_accompaniment = lessonStore.selected_accompaniment;
    const findAccompaniment = lessonStore.accompaniments.find((item) => item.id === selected_accompaniment);

    // Получаем индекс выбранной партитуры
    const findIndex = lessonStore.currentContentChart?.items
      .filter((item) => item.chart_type_id === CHART_TYPE.IMAGE)
      .findIndex((chart) => chart.id === chart_image_id);

    if (findIndex) {
      if (findAccompaniment) {
        if (findAccompaniment && findAccompaniment.libraries[findIndex]) {
          playerStore.setLibrary(findAccompaniment.libraries[findIndex].id);
          playerStore.loadTrack();
        } else {
          console.warn(`Not found library : `, findIndex);
        }
      }
    }
  };

  render() {
    const { systemStore, lessonStore } = this.props;

    return (
      <div className={b(null)}>

        {systemStore.service_name === SERVICE_NAME.COLLEGE && systemStore.instrument_name !== '' && systemStore.instrument_name == 'Guitar' && (
          <div className={b('head')}>
<Pagination type={'charts'}/>
          </div>
        )}

        {lessonStore.currentContentChart && (
          <>
            {lessonStore.currentContentScore && (
              <div className={b('header')}>
                <div className={b('information')}>
                  <div className={b('title')}>{lessonStore.currentContentChart.title}</div>
                  <div className={b('sub-title')}>{lessonStore.currentContentChart.sub_title}</div>
                </div>
              </div>
            )}

            <div
              className={b('list', {
                college: systemStore.service_name === SERVICE_NAME.COLLEGE
              })}
            >
              {lessonStore.currentContentChart.items.map((chart) => {
                if (chart.chart_type_id === CHART_TYPE.IMAGE) {
                  return (
                    <img
                      key={chart.id}
                      className={b('image')}
                      src={`${CONTENT_URL}${chart.content.image}`}
                      onClick={this.handleOnShow.bind(null, chart.id)}
                    />
                  );
                }
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './preview-chart.module.sass';
import { RootStore } from '../../../../stores';
import { Modal } from '../../modal/modal';
import { MODALS, SERVICE_NAME } from '../../../../constants';
import { Player } from '../../../components/lesson-view/header/player/player';
import { AccompanimentI } from '../../../../interfaces';

const b = block(style);

type PreviewChartProps = {
  service_name: SERVICE_NAME,
  show: boolean,
  totalChartImages: number,
  previewPath: string,
  previewCurrentNumber: number,
  hasPrevChartImage: boolean,
  hasNextChartImage: boolean,
  accompaniments: AccompanimentI[],
  onCloseModal: (id_modal: MODALS) => void,
  setCurrentPreviewChartIndex: (score_preview_index: number) => void,
  onChooseAccompaniment: (id: number) => void,
  onLoadTrack: () => void
};
type PreviewChartState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  show: store.modalsStore.list[MODALS.PREVIEW_CHART],
  totalChartImages: store.lessonStore.totalChartImages,
  previewPath: store.lessonStore.showPreviewChartPath,
  previewCurrentNumber: store.lessonStore.currentPreviewChartIndex,
  hasPrevChartImage: store.lessonStore.hasPrevChartImage,
  hasNextChartImage: store.lessonStore.hasNextChartImage,
  accompaniments: store.lessonStore.accompaniments,
  setCurrentPreviewChartIndex: store.lessonStore.setCurrentPreviewChartIndex,
  onCloseModal: store.modalsStore.close,
  onChooseAccompaniment: store.lessonStore.setAccompaniment,
  onLoadTrack: store.playerStore.loadTrack

}))
@observer
export class PreviewChart extends React.Component<PreviewChartProps, PreviewChartState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    show: false,
    totalChartImages: 0,
    previewPath: '',
    previewCurrentNumber: 0,
    hasPrevChartImage: false,
    hasNextChartImage: false,
    accompaniments: [],
    onCloseModal: () => console.log('Not set handler'),
    setCurrentPreviewChartIndex: () => console.log('Not set handler'),
    onChooseAccompaniment: () => console.log('Not set handler'),
    onLoadTrack: () => console.log('Not set handler')
  };

  handleOnClose = () => {
    const { onCloseModal } = this.props;
    onCloseModal(MODALS.PREVIEW_CHART);
  };

  handleOnSetCurrentPreviewScoreIndex = (previewCurrentNumber: number) => {
    const { setCurrentPreviewChartIndex, accompaniments, onChooseAccompaniment, onLoadTrack } = this.props;
    setCurrentPreviewChartIndex(previewCurrentNumber);

    if (previewCurrentNumber) {
      if (accompaniments[previewCurrentNumber]) {
        onChooseAccompaniment(accompaniments[previewCurrentNumber].id);
        onLoadTrack();
      }
    }
  };

  render() {
    const { service_name, show, totalChartImages, previewPath, previewCurrentNumber, hasNextChartImage, hasPrevChartImage } = this.props;

    return (
      <Modal size={'large'}
             auto
             isOpen={show}
             onClose={this.handleOnClose}>
        <div className={b(null, { [service_name]: true })}>
          <Player noMR />

          <div className={b('arrows')}>
            <button className={b('arrow', { left: true })}
                    disabled={(!hasPrevChartImage)}
                    onClick={() => this.handleOnSetCurrentPreviewScoreIndex(previewCurrentNumber - 1)} />
            <span className={b('total')}>{previewCurrentNumber} / <span>{totalChartImages - 1}</span></span>
            <button className={b('arrow', { right: true })}
                    disabled={(!hasNextChartImage)}
                    onClick={() => this.handleOnSetCurrentPreviewScoreIndex(previewCurrentNumber + 1)} />
          </div>

          <div className={b('images')}>
            <img src={`${CONTENT_URL}${previewPath}`}
                 className={b('image')}
                 alt='' />
          </div>
        </div>
      </Modal>
    );
  }
}

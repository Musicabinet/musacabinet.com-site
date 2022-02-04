import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './preview-notes.module.sass';
import { RootStore } from '../../../../stores';
import { Modal } from '../../modal/modal';
import { Player } from '../../../components/lesson-view/header/player/player';
import { MODALS, SERVICE_NAME } from '../../../../constants';
import { AccompanimentI } from '../../../../interfaces';
import { LessonStore, PlayerStore } from '../../../../stores';

const b = block(style);

type PreviewNotesProps = {
  lessonStore: LessonStore;
  playerStore: PlayerStore;
  service_name: SERVICE_NAME;
  show: boolean;
  totalScoresImages: number;
  previewPath: string;
  previewCurrentNumber: number;
  hasPrevScoreImage: boolean;
  hasNextScoreImage: boolean;
  accompaniments: AccompanimentI[];
  onCloseModal: (id_modal: MODALS) => void;
  setCurrentPreviewScoreIndex: (score_preview_index: number) => void;
  onChooseAccompaniment: (id: number) => void;
  onLoadTrack: () => void;
};
type PreviewNotesState = {};

@inject((store: RootStore) => ({
  lessonStore: store.lessonStore,
  playerStore: store.playerStore,
  service_name: store.systemStore.service_name,
  show: store.modalsStore.list[MODALS.PREVIEW_NOTES],
  totalScoresImages: store.lessonStore.totalScoresImages,
  previewPath: store.lessonStore.showPreviewScorePath,
  previewCurrentNumber: store.lessonStore.currentPreviewScoreIndex,
  hasPrevScoreImage: store.lessonStore.hasPrevScoreImage,
  hasNextScoreImage: store.lessonStore.hasNextScoreImage,
  accompaniments: store.lessonStore.accompaniments,
  setCurrentPreviewScoreIndex: store.lessonStore.setCurrentPreviewScoreIndex,
  onCloseModal: store.modalsStore.close,
  onChooseAccompaniment: store.lessonStore.setAccompaniment,
  onLoadTrack: store.playerStore.loadTrack
}))
@observer
export class PreviewNotes extends React.Component<PreviewNotesProps, PreviewNotesState> {
  static defaultProps = {
    lessonStore: {},
    playerStore: {},
    service_name: SERVICE_NAME.SCHOOL,
    show: false,
    totalScoresImages: 0,
    previewPath: '',
    previewCurrentNumber: 0,
    hasPrevScoreImage: false,
    hasNextScoreImage: false,
    accompaniments: [],
    onCloseModal: () => console.log('Not set handler'),
    setCurrentPreviewScoreIndex: () => console.log('Not set handler'),
    onChooseAccompaniment: () => console.log('Not set handler'),
    onLoadTrack: () => console.log('Not set handler')
  };

  handleOnClose = () => {
    const { onCloseModal } = this.props;
    onCloseModal(MODALS.PREVIEW_NOTES);
  };

  handleOnSetCurrentPreviewScoreIndex = (previewCurrentNumber: number) => {
    const { setCurrentPreviewScoreIndex, playerStore, lessonStore } = this.props;
    setCurrentPreviewScoreIndex(previewCurrentNumber);

    const selected_accompaniment = lessonStore.selected_accompaniment;

    const findAccompaniment = lessonStore.accompaniments.find((item) => item.id === selected_accompaniment);

    if (previewCurrentNumber && findAccompaniment) {
      if (findAccompaniment.libraries[previewCurrentNumber]) {
        playerStore.setLibrary(findAccompaniment.libraries[previewCurrentNumber].id);
        playerStore.loadTrack();
      } else {
        console.warn(`Error handleOnSetCurrentPreviewScoreIndex Not found library : `, previewCurrentNumber);
      }
    }
  };

  render() {
    const {
      service_name,
      show,
      totalScoresImages,
      previewPath,
      previewCurrentNumber,
      hasNextScoreImage,
      hasPrevScoreImage
    } = this.props;

    return (
      <Modal size={'large'} auto isOpen={show} onClose={this.handleOnClose}>
        <div className={b(null, { [service_name]: true })}>
          <Player noMR />

          <div className={b('arrows')}>
            <button
              className={b('arrow', { left: true })}
              disabled={!hasPrevScoreImage}
              onClick={() => this.handleOnSetCurrentPreviewScoreIndex(previewCurrentNumber - 1)}
            />
            <span className={b('total')}>
              {previewCurrentNumber + 1} / <span>{totalScoresImages}</span>
            </span>
            <button
              className={b('arrow', { right: true })}
              disabled={!hasNextScoreImage}
              onClick={() => this.handleOnSetCurrentPreviewScoreIndex(previewCurrentNumber + 1)}
            />
          </div>

          <div className={b('images')}>
            <img src={`${CONTENT_URL}${previewPath}`} className={b('image')} alt="" />
          </div>
        </div>
      </Modal>
    );
  }
}

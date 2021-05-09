import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './preview-notes.module.sass';
import { RootStore } from '../../../../stores';
import { Modal } from '../../modal/modal';
import { Player } from '../../../components/lesson-view/header/player/player';
import { MODALS, SERVICE_NAME } from '../../../../constants';

const b = block(style);

type PreviewNotesProps = {
  service_name: SERVICE_NAME,
  show: boolean,
  totalScoresImages: number,
  previewPath: string,
  previewCurrentNumber: number,
  hasPrevScoreImage: boolean,
  hasNextScoreImage: boolean,
  onCloseModal: (id_modal: MODALS) => void,
  setCurrentPreviewScoreIndex: (score_preview_index: number) => void
};
type PreviewNotesState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  show: store.modalsStore.list[MODALS.PREVIEW_NOTES],
  totalScoresImages: store.lessonStore.totalScoresImages,
  previewPath: store.lessonStore.showPreviewScorePath,
  previewCurrentNumber: store.lessonStore.currentPreviewScoreIndex,
  hasPrevScoreImage: store.lessonStore.hasPrevScoreImage,
  hasNextScoreImage: store.lessonStore.hasNextScoreImage,
  onCloseModal: store.modalsStore.close,
  setCurrentPreviewScoreIndex: store.lessonStore.setCurrentPreviewScoreIndex
}))
@observer
export class PreviewNotes extends React.Component<PreviewNotesProps, PreviewNotesState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    show: false,
    totalScoresImages: 0,
    previewPath: '',
    previewCurrentNumber: 0,
    hasPrevScoreImage: false,
    hasNextScoreImage: false,
    onCloseModal: () => console.log('Not set handler'),
    setCurrentPreviewScoreIndex: () => console.log('Not set handler')
  };

  handleOnClose = () => {
    const { onCloseModal } = this.props;
    onCloseModal(MODALS.PREVIEW_NOTES);
  };

  handleOnSetCurrentPreviewScoreIndex = (previewCurrentNumber: number) => {
    const { setCurrentPreviewScoreIndex } = this.props;
    setCurrentPreviewScoreIndex(previewCurrentNumber);
  };

  render() {
    const {
      service_name, show, totalScoresImages, previewPath, previewCurrentNumber,
      hasNextScoreImage, hasPrevScoreImage
    } = this.props;

    return (
      <Modal size={'large'}
             auto
             isOpen={show}
             onClose={this.handleOnClose}>
        <div className={b(null, { [service_name]: true })}>
          <Player noMR />

          <div className={b('images')}>
            <img src={`${CONTENT_URL}${previewPath}`}
                 className={b('image')}
                 alt='' />
          </div>

          <div className={b('arrows')}>
            <button className={b('arrow', { left: true })}
                    disabled={(!hasPrevScoreImage)}
                    onClick={() => this.handleOnSetCurrentPreviewScoreIndex(previewCurrentNumber - 1)} />
            <span className={b('total')}>{previewCurrentNumber} / <span>{totalScoresImages - 1}</span></span>
            <button className={b('arrow', { right: true })}
                    disabled={(!hasNextScoreImage)}
                    onClick={() => this.handleOnSetCurrentPreviewScoreIndex(previewCurrentNumber + 1)} />
          </div>
        </div>
      </Modal>
    );
  }
}

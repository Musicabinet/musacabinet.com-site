import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './scores.module.sass';
import { RootStore } from '../../../../stores';
import { ScoreI } from '../../../../interfaces';
import { MODALS, SCORE_TYPE, SERVICE_NAME } from '../../../../constants';

const b = block(style);

type ScoresProps = {
  service_name: SERVICE_NAME,
  total: number,
  nextScore: boolean,
  prevScore: boolean,
  currentContentScore: ScoreI | null,
  onShowPreview: (score_image_id: number) => void,
  onShowModal: (id_modal: MODALS) => void
};
type ScoresState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  total: store.lessonStore.scoresTotal,
  nextScore: store.lessonStore.scoresHasNext,
  prevScore: store.lessonStore.scoresHasPrev,
  currentContentScore: store.lessonStore.currentContentScore,
  onShowPreview: store.lessonStore.showPreviewScore,
  onShowModal: store.modalsStore.show
}))
@observer
export class Scores extends React.Component<ScoresProps, ScoresState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    total: 0,
    nextScore: false,
    prevScore: false,
    currentContentScore: null,
    onShowPreview: () => console.log('Not set handler'),
    onShowModal: () => console.log('Not set handler')
  };

  handleOnShow = (score_image_id: number) => {
    const { onShowPreview, onShowModal } = this.props;
    onShowPreview(score_image_id);
    onShowModal(MODALS.PREVIEW_NOTES);
  };

  render() {
    const { currentContentScore, service_name } = this.props;

    return (
      <div className={b(null)}>
        {currentContentScore && (
          <>
            <div className={b('header')}>
              <div className={b('information')}>
                <div className={b('title')}>{currentContentScore.name}</div>
              </div>
            </div>

            <div className={b('list', {
              college: (service_name === SERVICE_NAME.COLLEGE)
            })}>
              {currentContentScore.items.map((item) => {
                if (item.score_type_id === SCORE_TYPE.IMAGE) {
                  return (
                    <img key={item.id}
                         className={b('image')}
                         src={`${CONTENT_URL}${item.content.image}`}
                         onClick={this.handleOnShow.bind(null, item.id)} />
                  );
                }

                if (item.score_type_id === SCORE_TYPE.TITLE) {
                  const align: string = item.content.align || 'center';
                  return (
                    <div key={item.id}
                         className={b('sub-title', {
                           [align]: true
                         })}>{item.content.title}</div>
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

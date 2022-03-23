import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './scores.module.sass';
import { LessonStore, PlayerStore, RootStore, SystemStore } from '../../../../stores';
import { AccompanimentI, ScoreI } from '../../../../interfaces';
import { MODALS, SCORE_TYPE, SERVICE_NAME } from '../../../../constants';
import { Pagination } from '../../../common/pagination/pagination';


const b = block(style);

type ScoresProps = {
  systemStore: SystemStore;
  lessonStore: LessonStore;
  playerStore: PlayerStore;
  service_name: SERVICE_NAME;
  total: number;
  nextScore: boolean;
  prevScore: boolean;
  currentContentScore: ScoreI | null;
  accompaniments: AccompanimentI[];
  onShowPreview: (score_image_id: number) => void;
  onShowModal: (id_modal: MODALS) => void;
  onChooseAccompaniment: (id: number) => void;
  onLoadTrack: () => void;
};
type ScoresState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  lessonStore: store.lessonStore,
  playerStore: store.playerStore,
  service_name: store.systemStore.service_name,
  total: store.lessonStore.scoresTotal,
  nextScore: store.lessonStore.scoresHasNext,
  prevScore: store.lessonStore.scoresHasPrev,
  currentContentScore: store.lessonStore.currentContentScore,
  accompaniments: store.lessonStore.accompaniments,
  onShowPreview: store.lessonStore.showPreviewScore,
  onShowModal: store.modalsStore.show,
  onChooseAccompaniment: store.lessonStore.setAccompaniment,
  onLoadTrack: store.playerStore.loadTrack
}))
@observer
export class Scores extends React.Component<ScoresProps, ScoresState> {
  static defaultProps = {
    systemStore: {},
    lessonStore: {},
    playerStore: {},
    service_name: SERVICE_NAME.SCHOOL,
    total: 0,
    nextScore: false,
    prevScore: false,
    currentContentScore: null,
    accompaniments: [],
    onShowPreview: () => console.log('Not set handler'),
    onShowModal: () => console.log('Not set handler'),
    onChooseAccompaniment: () => console.log('Not set handler'),
    onLoadTrack: () => console.log('Not set handler')
  };

  handleOnShow = (score_image_id: number) => {
    const { currentContentScore, onShowPreview, onShowModal, playerStore, lessonStore } = this.props;

    // Если это музыкальные лекции то не даем увеличивать
    if (currentContentScore?.name.toLowerCase().match(/music literature/)) {
      return false;
    }

    onShowPreview(score_image_id);
    onShowModal(MODALS.PREVIEW_NOTES);

    const selected_accompaniment = lessonStore.selected_accompaniment;

    const findAccompaniment = lessonStore.accompaniments.find((item) => item.id === selected_accompaniment);

    // Получаем индекс выбранной партитуры
    const findIndex = currentContentScore?.items
      .filter((item) => item.score_type_id === SCORE_TYPE.IMAGE)
      .findIndex((score) => score.id === score_image_id);

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

  /*handleOnChange = (clickEvent: {
    index: number | null;
    selected: number;
    nextSelectedPage: number | undefined;
    event: object;
    isPrevious: boolean;
    isNext: boolean;
    isBreak: boolean;
    isActive: boolean;
  }) => {
  };*/

  render() {
    const { currentContentScore, service_name } = this.props;
    //const isShowHead = systemStore.service_name === SERVICE_NAME.SCHOOL || (systemStore.instrument_name != 'Guitar' && systemStore.service_name === SERVICE_NAME.COLLEGE);


    return (
      <div className={b(null)}>


        <div className={b('head')}>
          <Pagination/>
        </div>

        {currentContentScore && (
          <>
            <div className={b('header')}>
              <div className={b('information')}>
                <div className={b('title')}>{currentContentScore.name}</div>
                <div className={b('sub-title')}>{currentContentScore.sub_title}</div>
              </div>
            </div>

            <div
              className={b('list', {
                college: service_name === SERVICE_NAME.COLLEGE
              })}
            >
              {currentContentScore.items.map((item) => {
                if (item.score_type_id === SCORE_TYPE.IMAGE) {
                  return (
                    <img
                      key={item.id}
                      className={b('image')}
                      src={`${CONTENT_URL}${item.content.image}`}
                      onClick={this.handleOnShow.bind(null, item.id)}
                    />
                  );
                }

                if (item.score_type_id === SCORE_TYPE.TITLE) {
                  const align: string = item.content.align || 'center';
                  return (
                    <div
                      key={item.id}
                      className={b('sub-title', {
                        [align]: true
                      })}
                    >
                      {item.content.title}
                    </div>
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

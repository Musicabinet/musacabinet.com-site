import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './pagination.module.sass';
import { RootStore } from '../../../../../stores';
import { SERVICE_NAME } from '../../../../../constants';
import { LessonStore } from '../../../../../stores/lesson';
import { PlayerStore } from '../../../../../stores/player';

const b = block(style);

type PaginationProps = {
  lessonStore: LessonStore,
  playerStore: PlayerStore,
  service_name: SERVICE_NAME
};
type PaginationState = {};

@inject((store: RootStore) => ({
  lessonStore: store.lessonStore,
  playerStore: store.playerStore,
  service_name: store.systemStore.service_name
}))
@observer
export class Pagination extends React.Component<PaginationProps, PaginationState> {

  static defaultProps = {
    lessonStore: {},
    playerStore: {},
    service_name: SERVICE_NAME.SCHOOL
  };

  handleNextPage = () => {
    const { lessonStore } = this.props;
    lessonStore.setCurrentScore(lessonStore.currentScore + 1);
    this.handleSetFirstTrack();
  };

  handlePrevPage = () => {
    const { lessonStore } = this.props;
    lessonStore.setCurrentScore(lessonStore.currentScore - 1);
    this.handleSetFirstTrack();
  };

  handleSetFirstTrack = () => {
    const { lessonStore, playerStore } = this.props;
    const findAccompaniment = lessonStore.accompaniments.find(
      (item) => item.id === lessonStore.selected_accompaniment
    );

    if (findAccompaniment && findAccompaniment.libraries.length > 0) {
      const library_id = findAccompaniment.libraries[0].id;
      playerStore.setLibrary(library_id);
      playerStore.loadTrack();
    }
  };

  render() {
    const { lessonStore, service_name } = this.props;

    return (
      <div className={b(null, {
        [service_name]: true,
        hidden: lessonStore.scoresTotal < 2
      })}>
        <button onClick={this.handlePrevPage}
                disabled={0 === lessonStore.currentScore}
                className={b('btn', {
                  left: true
                })} />
        <div className={b('current')}>{lessonStore.currentScore + 1} of {lessonStore.scoresTotal}</div>
        <button onClick={this.handleNextPage}
                disabled={lessonStore.scoresTotal === lessonStore.currentScore + 1}
                className={b('btn', { right: true })} />
      </div>
    );
  }
}

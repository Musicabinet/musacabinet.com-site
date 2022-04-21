import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { LessonStore, PlayerStore, RootStore } from '../../../../../../../stores';
import block from 'bem-css-modules';
import style from './burger-accompaniments.module.sass';
import { LibraryI } from '../../../../../../../interfaces';

const b = block(style);

type AccompanimentItemProps = {
  library: LibraryI;
  playerStore: PlayerStore;
  lessonStore: LessonStore;
  active: boolean;
  ordinalNumber: number;
  onClose: () => void;
};
type AccompanimentItemState = {};

@inject((store: RootStore) => ({
  playerStore: store.playerStore,
  lessonStore: store.lessonStore
}))
@observer
export class AccompanimentItem extends React.Component<AccompanimentItemProps, AccompanimentItemState> {

  static defaultProps = {
    playerStore: {},
    lessonStore: {}
  };

  handleOnClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const { library, playerStore, lessonStore, ordinalNumber, onClose } = this.props;

    if (library.id === playerStore.selected_library_id) {
      return false;
    }

    lessonStore.setCurrentPreviewChartIndex(ordinalNumber);
    lessonStore.setCurrentPreviewScoreIndex(ordinalNumber);
    playerStore.setLibrary(library.id);
    playerStore.loadTrack();
    onClose();
  };

  render() {
    const { library, active } = this.props;

    return (
      <li onClick={this.handleOnClick}
          className={b('item', { active })}>{library.name}</li>
    );
  }
}

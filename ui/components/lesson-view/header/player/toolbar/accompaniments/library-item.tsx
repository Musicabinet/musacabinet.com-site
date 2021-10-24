import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './accompaniments.module.sass';
import { LibraryI } from '../../../../../../../interfaces';
import { PlayerStore } from '../../../../../../../stores/player';
import { RootStore } from '../../../../../../../stores';

const b = block(style);

type LibraryItemProps = {
  library: LibraryI;
  playerStore: PlayerStore;
};
type LibraryItemState = {};

@inject((store: RootStore) => ({
  playerStore: store.playerStore
}))
@observer
export class LibraryItem extends React.Component<LibraryItemProps, LibraryItemState> {
  static defaultProps = {
    playerStore: {}
  };

  handleOnClick = () => {
    const { library, playerStore } = this.props;

    if (library.id === playerStore.selected_library_id) {
      return false;
    }

    playerStore.setLibrary(library.id);
    playerStore.loadTrack();
  };

  render() {
    const { library, playerStore } = this.props;

    return (
      <div
        className={b('item', { selected: library.id === playerStore.selected_library_id })}
        onClick={this.handleOnClick}
      >
        {library.pivot.custom_name || library.name}
      </div>
    );
  }
}

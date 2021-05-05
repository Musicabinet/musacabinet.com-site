import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './track-list.module.sass';
import { RootStore } from '../../../../../../../../stores';
import { LibraryI } from '../../../../../../../../interfaces';

const b = block(style);

type TrackItemProps = {
  selected_accompaniment: number,
  selected_library_id: number,
  onChoose: (id_library: number) => void
};
type TrackItemState = {};

@inject((store: RootStore) => ({
  selected_accompaniment: store.lessonStore.selected_accompaniment,
  selected_library_id: store.playerStore.selected_library_id
}))
@observer
export class TrackItem extends React.Component<TrackItemProps & LibraryI, TrackItemState> {

  static defaultProps = {
    selected_accompaniment: 0,
    selected_library_id: 0
  };

  handleOnClick = () => {
    const { id, onChoose } = this.props;
    onChoose(id);
  };

  render() {
    const { name, pivot, selected_library_id, selected_accompaniment } = this.props;

    return (
      <li
        className={b('item', {
          selected: (pivot.accompaniment_id === selected_accompaniment && pivot.library_id === selected_library_id)
        })}
        onClick={this.handleOnClick}>{name}</li>
    );
  }
}

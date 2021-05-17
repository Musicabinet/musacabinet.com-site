import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './track-list.module.sass';
import { RootStore } from '../../../../../../../../stores';
import { LibraryI } from '../../../../../../../../interfaces';
import { TrackItem } from './track-item';
import { handleDetectClick } from '../../../../../../../../helpers';

const b = block(style);

type TrackListProps = {
  show: boolean,
  list: LibraryI[],
  onSetLibrary: (id_library: number) => void,
  onLoadTrack: () => void,
  onCloseList: () => void
};
type TrackListState = {};

@inject((store: RootStore) => ({
  onSetLibrary: store.playerStore.setLibrary,
  onLoadTrack: store.playerStore.loadTrack
}))
@observer
export class TrackList extends React.Component<TrackListProps, TrackListState> {

  containerListRef = React.createRef<HTMLUListElement>();

  static defaultProps = {
    onLoadTrack: () => console.log('Not set handler'),
    onSetLibrary: () => console.log('Not set handler')
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (e: MouseEvent) => {
    const { onCloseList } = this.props;
    handleDetectClick(this.containerListRef, onCloseList, e);
  };

  handleOnChooseTrack = (id_library: number) => {
    const { onSetLibrary, onLoadTrack, onCloseList } = this.props;
    onSetLibrary(id_library);
    onLoadTrack();
    onCloseList();
  };

  render() {
    const { show, list } = this.props;

    return (
      <ul ref={this.containerListRef}
          className={b(null, { show })}>
        {list.map((track) => {
          return <TrackItem key={track.uuid}
                            id={track.id}
                            uuid={track.uuid}
                            sort={track.sort}
                            service_id={track.service_id}
                            name={track.name}
                            type={track.type}
                            is_active={track.is_active}
                            tracks={track.tracks}
                            pivot={track.pivot}
                            onChoose={this.handleOnChooseTrack} />;
        })}
      </ul>
    );
  }

}

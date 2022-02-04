import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './accompaniments.module.sass';
import { RootStore } from '../../../../../../../stores';
import { AccompanimentStore } from '../../../../../../../stores/accompaniment';
import { LibraryItem } from './library-item';

const b = block(style);

type AccompanimentsProps = {
  list: AccompanimentStore[];
  selected_accompaniment: number;
  name_track: string;
  onChooseAccompaniment: (id: number) => void;
  onLoadTrack: () => void;
};
type AccompanimentsState = {};

@inject((store: RootStore) => ({
  list: store.lessonStore.accompaniments,
  selected_accompaniment: store.lessonStore.selected_accompaniment,
  name_track: store.playerStore.nameSelectedTrack,
  onChooseAccompaniment: store.lessonStore.setAccompaniment,
  onLoadTrack: store.playerStore.loadTrack
}))
@observer
export class Accompaniments extends React.Component<AccompanimentsProps, AccompanimentsState> {
  static defaultProps = {
    list: [],
    selected_accompaniment: 0,
    name_track: '',
    onChooseAccompaniment: () => console.log('Not set handler'),
    onLoadTrack: () => console.log('Not set handler')
  };

  handleOnChooseAccompaniment = (id: number) => {
    const { onChooseAccompaniment, onLoadTrack } = this.props;
    onChooseAccompaniment(id);
    onLoadTrack();
  };

  render() {
    const { list, selected_accompaniment } = this.props;
    const findAccompaniment = list.find((item) => item.id === selected_accompaniment);

    return (
      <div className={b(null)}>
        {findAccompaniment &&
          findAccompaniment.libraries.length > 0 &&
          findAccompaniment.libraries.map((library, number) => {
            return <LibraryItem key={library.id} library={library} ordinalNumber={number}/>;
          })}
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './accompaniments.module.sass';
import { RootStore } from '../../../../../../../stores';
import { AccompanimentItem } from './item';
import { AccompanimentI } from '../../../../../../../interfaces';

const b = block(style);

type AccompanimentsProps = {
  list: AccompanimentI[],
  selected_accompaniment: number,
  name_track: string,
  onChooseAccompaniment: (id: number) => void,
  onLoadTrack: () => void
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
    const { list, selected_accompaniment, name_track } = this.props;

    return (
      <div className={b(null)}>
        {list.map((accompaniment) => {
          return (<AccompanimentItem key={accompaniment.id}
                                     id={accompaniment.id}
                                     lesson_id={accompaniment.lesson_id}
                                     sort={accompaniment.sort}
                                     name={accompaniment.name}
                                     libraries={accompaniment.libraries}
                                     selected={(selected_accompaniment === accompaniment.id)}
                                     onChoose={this.handleOnChooseAccompaniment}
                                     selected_name_track={name_track} />);
        })}
      </div>
    );
  }
}

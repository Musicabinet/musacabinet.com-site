import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './metronome.module.sass';
import { ImageMetronome } from './image/image';
import { Bpm } from './bpm/bpm';
import { StartButton } from './start/start';
import { RootStore } from '../../../../../../stores';
import { VolumeControl } from '../../../../../common';

const b = block(style);

type MetronomeProps = {
  volume: number,
  initBPM: () => void,
  worker: Worker | null,
  playTick: () => void,
  onChangeVolume: (name: string, volume: number) => void
};
type MetronomeState = {};

@inject((store: RootStore) => ({
  volume: store.metronomeStore.volume,
  initBPM: store.metronomeStore.init,
  worker: store.metronomeStore.worker,
  playTick: store.metronomeStore.onPlayTick,
  onChangeVolume: store.metronomeStore.changeVolume
}))
@observer
export class Metronome extends React.Component<MetronomeProps, MetronomeState> {

  static defaultProps = {
    volume: 0,
    initBPM: () => console.log('Not set handler'),
    worker: null,
    playTick: () => console.log("Not set handler"),
    onChangeVolume: ()=> console.log("Not set handler")
  };

  componentDidMount() {
    const { initBPM } = this.props;
    initBPM();
  }

  componentWillUnmount() {
    const { worker, playTick } = this.props;

    if (worker) {
      document.removeEventListener('message', playTick);
    }
  }

  render() {
    const {volume, onChangeVolume} = this.props;

    return (
      <div className={b(null)}>
        <ImageMetronome />
        <Bpm />
        <StartButton />
        <VolumeControl name={'volume'}
                       min={0}
                       max={1}
                       defaultValue={volume}
                       step={0.1}
                       onChange={onChangeVolume} />
      </div>
    );
  }
}

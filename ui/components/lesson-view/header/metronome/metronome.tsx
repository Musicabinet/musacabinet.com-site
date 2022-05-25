import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './metronome.module.sass';
import { MetronomeStore, RootStore, SystemStore } from '../../../../../stores';
import { Button } from './button/button';
import { METRONOME_BUTTON_TYPE } from '../../../../../constants';
import { VolumeControl } from '../../../../common';

const b = block(style);

type MetronomeProps = {
  metronomeStore: MetronomeStore,
  systemStore: SystemStore
};
type MetronomeState = {
  bpm: number
};

@inject((store: RootStore) => ({
  metronomeStore: store.metronomeStore,
  systemStore: store.systemStore
}))
@observer
export class Metronome extends React.Component<MetronomeProps, MetronomeState> {

  static defaultProps = {
    metronomeStore: {},
    systemStore: {}
  };

  state = {
    bpm: this.props.metronomeStore.current
  };

  async componentDidMount() {
    const { metronomeStore } = this.props;
    await metronomeStore.init();
  }

  handleOnChangeMetronome = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      bpm: Number(e.currentTarget.value)
    });
  };

  handleOnBlurMetronome = () => {
    const { bpm } = this.state;
    const { metronomeStore } = this.props;

    let currentBpm = bpm;

    if (bpm < 20) {
      currentBpm = 20;
    } else if (bpm > 240) {
      currentBpm = 240;
    }

    this.setState({
      bpm: currentBpm
    }, (() => {
      metronomeStore.setBPM(currentBpm);
    }));
  };

  handleSetBPM = (value: number) => {
    this.setState({
      bpm: value
    });
  };

  render() {
    const { metronomeStore, systemStore } = this.props;
    const { bpm } = this.state;

    return (
      <div className={b(null, {
        [systemStore.service_name]: true
      })}>
        <div className={b('header')}>Metronome</div>
        <div className={b('body')}>
          <div className={b('container')}>

            <div className={b('control')}>
              <Button type={METRONOME_BUTTON_TYPE.DECREMENT}
                      onCallback={this.handleSetBPM} />
              <input type='number'
                     value={bpm}
                     onChange={this.handleOnChangeMetronome}
                     onBlur={this.handleOnBlurMetronome}
                     className={b('bpm')} />
              <Button type={METRONOME_BUTTON_TYPE.INCREMENT}
                      onCallback={this.handleSetBPM} />
            </div>
            <div className={b('action')}>
              <button onClick={metronomeStore.onPlayStop}
                      className={b('start')}>
                {metronomeStore.isPlay ? 'Stop' : 'Start'}
              </button>
            </div>
          </div>
          <div className={b('volume')}>
            <VolumeControl defaultValue={metronomeStore.volume}
                           name={'volume'}
                           min={0}
                           max={100}
                           onChange={metronomeStore.changeVolume} />
          </div>
        </div>
      </div>
    );
  }
}

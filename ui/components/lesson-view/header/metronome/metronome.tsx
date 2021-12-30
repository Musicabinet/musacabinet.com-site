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
type MetronomeState = {};

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

  async componentDidMount() {
    const { metronomeStore } = this.props;
    await metronomeStore.init();
  }

  render() {
    const { metronomeStore, systemStore } = this.props;

    return (
      <div className={b(null, {
        [systemStore.service_name]: true
      })}>
        <div className={b('header')}>Metronome</div>
        <div className={b('body')}>
          <div className={b('container')}>

            <div className={b('control')}>
              <Button type={METRONOME_BUTTON_TYPE.DECREMENT} />
              <input type='number' value={metronomeStore.current} readOnly className={b('bpm')} />
              <Button type={METRONOME_BUTTON_TYPE.INCREMENT} />
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
                           max={1}
                           onChange={metronomeStore.changeVolume} />
          </div>
        </div>
      </div>
    );
  }
}

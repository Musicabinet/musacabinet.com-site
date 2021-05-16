import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './player.module.sass';
import { RootStore } from '../../../../../stores';
import { Toolbar } from './toolbar/toolbar';
import { BackTrack } from './back-track/back-track';
import { PlayButton } from './play-button/play-button';
import { ProgressLine } from './progress-line/progress-line';
import { ButtonComposition } from './button-composition/button-composition';
import { VolumeControl } from '../../../../common';
import { Divider } from './divider/divider';
import { Metronome } from './metronome/metronome';
import { SERVICE_NAME } from '../../../../../constants';

const b = block(style);

type PlayerProps = {
  service_name: SERVICE_NAME,
  isLoading: boolean,
  init: () => void,
  noMR: boolean,
  selected_accompaniment: number,
  onSetVolume: (value: number) => void
};
type PlayerState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  isLoading: store.playerStore.isFetch,
  init: store.playerStore.init,
  selected_accompaniment: store.lessonStore.selected_accompaniment,
  onSetVolume: store.playerStore.setVolume
}))
@observer
export class Player extends React.Component<PlayerProps, PlayerState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    isLoading: false,
    init: () => console.log('Not set handler'),
    noMR: false,
    selected_accompaniment: 0,
    onSetVolume: () => console.log('Not set handler')
  };

  state = {
    volume: -24
  };

  componentDidMount() {
    const { init } = this.props;
    init();
  }

  handleOnChangeVolume = (name: string, value: number) => {
    const { onSetVolume } = this.props;
    this.setState({
      [name]: value
    });
    onSetVolume(value);
  };

  render() {
    const { volume } = this.state;
    const { service_name, noMR, isLoading } = this.props;

    return (
      <div className={b(null, { noMR, [service_name]: true })}>
        <div className={b('loading', { show: isLoading })}>
          Loading track <span>.</span><span>.</span><span>.</span>
        </div>
        <Toolbar />
        <div className={b('container')}>
          <BackTrack />
          <PlayButton />
          <ProgressLine />
          <VolumeControl name={'volume'}
                         min={-48}
                         max={0}
                         onChange={this.handleOnChangeVolume}
                         defaultValue={volume} />
          <Divider />
          <Metronome />
          <ButtonComposition />
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './player.module.sass';
import { LessonStore, PlayerStore, RootStore } from '../../../../../stores';
import { Toolbar } from './toolbar/toolbar';
import { BackTrack } from './back-track/back-track';
import { PlayButton } from './play-button/play-button';
import { ProgressLine } from './progress-line/progress-line';
import { ButtonComposition } from './button-composition/button-composition';
import { VolumeControl } from '../../../../common';
import { Metronome } from './metronome/metronome';
import { SERVICE_NAME } from '../../../../../constants';

const b = block(style);

type PlayerProps = {
  playerStore: PlayerStore;
  lessonStore: LessonStore;
  service_name: SERVICE_NAME;
  noMR: boolean;
};
type PlayerState = {};

@inject((store: RootStore) => ({
  playerStore: store.playerStore,
  lessonStore: store.lessonStore,
  service_name: store.systemStore.service_name
}))
@observer
export class Player extends React.Component<PlayerProps, PlayerState> {
  static defaultProps = {
    playerStore: {},
    lessonStore: {},
    service_name: SERVICE_NAME.SCHOOL,
    init: () => console.log('Not set handler'),
    noMR: false
  };

  state = {
    volume: -15
  };

  componentDidMount() {
    const { playerStore } = this.props;
    playerStore.init();
  }

  handleOnChangeVolume = (name: string, value: number) => {
    const { playerStore } = this.props;
    this.setState({
      [name]: value
    });
    playerStore.setVolume(value);
  };

  render() {
    const { volume } = this.state;
    const { playerStore, service_name, noMR } = this.props;

    return (
      <div className={b(null, { noMR, [service_name]: true })}>
        <div className={b('loading', { show: playerStore.isFetch })}>
          Loading track <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
        <Toolbar />
        <div className={b('container')}>
          <BackTrack />
          <PlayButton />
          <ProgressLine />
          <VolumeControl name={'volume'} min={-30} max={0} onChange={this.handleOnChangeVolume} defaultValue={volume} />
          <Metronome />
          <ButtonComposition />
        </div>
      </div>
    );
  }
}

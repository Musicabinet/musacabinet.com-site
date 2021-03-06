import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './player.module.sass';
import { LessonStore, PlayerStore, RootStore } from '../../../../../stores';
import { Toolbar } from './toolbar/toolbar';
import { BackTrack } from './back-track/back-track';
import { PlayButton } from './play-button/play-button';
import { ProgressLine } from './progress-line/progress-line';
import { LibraryType, PLAYER_CONST, SERVICE_NAME } from '../../../../../constants';
import { DividerVertical } from './divider-vertical/divider-vertical';
import { Switcher } from './switcher/switcher';
import { VolumeControl } from '../../../../common';

const b = block(style);

type PlayerProps = {
  playerStore: PlayerStore;
  lessonStore: LessonStore;
  service_name: SERVICE_NAME;
  noMR: boolean;
  isPreview: boolean;
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
    noMR: false,
    isPreview: false
  };

  state = {
    volume: -6
  };

  componentDidMount() {
    const { playerStore } = this.props;
    playerStore.init();

    // Устанавливаем значение громкости
    this.setState(() => {
      const currentVolume = localStorage.getItem(PLAYER_CONST.VOLUME);

      if (currentVolume) {
        playerStore.setVolume(Number(currentVolume));
      } else {
        playerStore.setVolume(-50);
      }

      return {
        volume: currentVolume ? Number(currentVolume) : -50
      };
    });
  }

  handleOnChangeVolume = (name: string, value: number) => {
    const { playerStore } = this.props;

    this.setState({
      [name]: value
    });
    playerStore.setVolume(value);
  };


  handleOnToggle = (player_id: 0 | 1 | 2) => {
    const { playerStore } = this.props;
    playerStore.onMute(player_id);
  };

  render() {
    const { playerStore, lessonStore, service_name, noMR } = this.props;
    const { volume } = this.state;

    return (
      <div className={b('preview')}>
        <div className={b(null, { noMR, [service_name]: true })}>
          <div className={b('loading', { show: playerStore.isFetch })}>
            Loading track <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
          <div className={b('body')}>
            <Toolbar />
            <div className={b('container')}>
              <BackTrack />
              <PlayButton />
              <ProgressLine />
            </div>
          </div>
          <DividerVertical />

          <div className={b('block', {
            close: playerStore.isShowTracks,
            switchers: true
          })}>
            <Switcher service_name={service_name}
                      label={'Keyboard'}
                      checked={playerStore.keysMute}
                      disabled={playerStore.library_type !== LibraryType.COMPOSITION || lessonStore.accompaniments.length === 0}
                      onChange={this.handleOnToggle.bind(null, 2)} />
            <Switcher service_name={service_name}
                      label={'Bass'}
                      checked={playerStore.bassMute}
                      disabled={playerStore.library_type !== LibraryType.COMPOSITION || lessonStore.accompaniments.length === 0}
                      onChange={this.handleOnToggle.bind(null, 0)} />
            <Switcher service_name={service_name}
                      label={'Drums'}
                      checked={playerStore.drumsMute}
                      disabled={playerStore.library_type !== LibraryType.COMPOSITION || lessonStore.accompaniments.length === 0}
                      onChange={this.handleOnToggle.bind(null, 1)} />
          </div>

          <div className={b('block')}>
            <VolumeControl value={volume}
                           min={-30}
                           max={-6}
                           name={'volume'}
                           isNegative
                           onChange={this.handleOnChangeVolume} />
          </div>

        </div>

      </div>
    );
  }
}

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

const b = block(style);

type PlayerProps = {
  init: () => void,
  selected_accompaniment: number
};
type PlayerState = {};

@inject((store: RootStore) => ({
  init: store.playerStore.init,
  selected_accompaniment: store.lessonStore.selected_accompaniment
}))
@observer
export class Player extends React.Component<PlayerProps, PlayerState> {

  static defaultProps = {
    init: () => console.log('Not set handler'),
    selected_accompaniment: 0
  };

  state = {};

  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    return (
      <div className={b(null)}>
        <Toolbar />
        <div className={b('container')}>
          <BackTrack />
          <PlayButton />
          <ProgressLine />
          <ButtonComposition />
        </div>
      </div>
    );
  }
}

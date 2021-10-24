import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './play-button.module.sass';
import { RootStore } from '../../../../../../stores';
import { getIcon, LIST_ICON } from '../../../../../common/icons';
import { SERVICE_NAME } from '../../../../../../constants';

const b = block(style);

type PlayButtonProps = {
  service_name: SERVICE_NAME;
  is_playing: boolean;
  onPlay: () => void;
  onStop: () => void;
};
type PlayButtonState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  is_playing: store.playerStore.is_playing,
  onPlay: store.playerStore.onPlay,
  onStop: store.playerStore.onStop
}))
@observer
export class PlayButton extends React.Component<PlayButtonProps, PlayButtonState> {
  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    is_playing: false,
    onPlay: () => console.log('Not set handler'),
    onStop: () => console.log('Not set handler')
  };

  handleOnPlay = () => {
    const { is_playing, onPlay, onStop } = this.props;
    if (!is_playing) {
      onPlay();
    } else {
      onStop();
    }
  };

  render() {
    const { service_name, is_playing } = this.props;

    return (
      <button className={b(null, { [service_name]: true, is_playing })} onClick={this.handleOnPlay}>
        {getIcon(LIST_ICON.PLAY, b('icon'))}
      </button>
    );
  }
}

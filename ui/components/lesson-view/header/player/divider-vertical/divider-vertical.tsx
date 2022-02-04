import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './divider-vertical.module.sass';
import { PlayerStore, RootStore, SystemStore } from '../../../../../../stores';

const b = block(style);

type DividerVerticalProps = {
  systemStore: SystemStore,
  playerStore: PlayerStore
};
type DividerVerticalState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  playerStore: store.playerStore
}))
@observer
export class DividerVertical extends React.Component<DividerVerticalProps, DividerVerticalState> {

  static defaultProps = {
    systemStore: {},
    playerStore: {}
  };

  handleOnToggle = () => {
    const { playerStore } = this.props;
    playerStore.setShowTracks(!playerStore.isShowTracks);
  };

  render() {
    const { systemStore, playerStore } = this.props;

    return (
      <div className={b(null, { [systemStore.service_name]: true })}>
        <button className={b('close', {
          isShowTracks: playerStore.isShowTracks
        })} onClick={this.handleOnToggle} />
      </div>
    );
  }
}

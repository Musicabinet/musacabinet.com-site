import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './button-composition.module.sass';
import { RootStore } from '../../../../../../stores';
import { LibraryType, SERVICE_NAME } from '../../../../../../constants';
import { AccompanimentI } from '../../../../../../interfaces';

const b = block(style);

type ButtonCompositionProps = {
  service_name: SERVICE_NAME,
  accompaniments: AccompanimentI[],
  library_type: LibraryType,
  bassMute: boolean,
  drumsMute: boolean,
  keysMute: boolean,
  onMute: (player_id: number) => void
};
type ButtonCompositionState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  accompaniments: store.lessonStore.accompaniments,
  library_type: store.playerStore.library_type,
  bassMute: store.playerStore.bassMute,
  drumsMute: store.playerStore.drumsMute,
  keysMute: store.playerStore.keysMute,
  onMute: store.playerStore.onMute
}))
@observer
export class ButtonComposition extends React.Component<ButtonCompositionProps, ButtonCompositionState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    accompaniments: [],
    library_type: LibraryType.SINGLE,
    bassMute: false,
    drumsMute: false,
    keysMute: false,
    onMute: () => console.log('Not set handler')
  };

  handleOnToggle = (player_id: number) => {
    const { onMute } = this.props;
    onMute(player_id);
  };

  render() {
    const { service_name, library_type, bassMute, drumsMute, keysMute, accompaniments } = this.props;

    if(library_type !== LibraryType.COMPOSITION || accompaniments.length === 0){
      return null
    }

    return (
      <div className={b(null, { [service_name]: true })}>
        <button className={b('button', { mute: drumsMute })}
                onClick={this.handleOnToggle.bind(null, 1)}>Drums
        </button>

        <button className={b('button', { mute: bassMute })}
                onClick={this.handleOnToggle.bind(null, 0)}>Bass
        </button>

        <button className={b('button', { mute: keysMute })}
                onClick={this.handleOnToggle.bind(null, 2)}>Keys
        </button>
      </div>
    );
  }
}

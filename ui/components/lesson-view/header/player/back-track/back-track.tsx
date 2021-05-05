import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './back-track.module.sass';
import { RootStore } from '../../../../../../stores';
import { SERVICE_NAME } from '../../../../../../constants';
import { getIcon, LIST_ICON } from '../../../../../common/icons';

const b = block(style);

type BackTrackProps = {
  service_name: SERVICE_NAME,
  onBack: () => void
};
type BackTrackState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  onBack: store.playerStore.onBack
}))
@observer
export class BackTrack extends React.Component<BackTrackProps, BackTrackState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    onBack: () => console.log('Not set handler')
  };

  render() {
    const { service_name, onBack } = this.props;

    return (
      <button className={b(null, { [service_name]: true })}
              onClick={onBack}>
        {getIcon(LIST_ICON.BACK_BUTTON, b('icon'))}
      </button>
    );
  }
}

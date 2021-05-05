import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './play.module.sass';
import { RootStore } from '../../../../../../../stores';
import { SERVICE_NAME } from '../../../../../../../constants';
import { getIcon, LIST_ICON } from '../../../../../../common/icons';

const b = block(style);

type PlayProps = {
  service_name: SERVICE_NAME,
  status: boolean,
  onStart: () => void,
  onStop: () => void,
};
type PlayState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  status: store.lessonProgress.timer,
  onStart: store.lessonProgress.start,
  onStop: store.lessonProgress.stop
}))
@observer
export class Play extends React.Component<PlayProps, PlayState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    status: false,
    onStart: () => console.log('Not set handler'),
    onStop: () => console.log('Not set handler')
  };

  handleOnChangeToggle = (e: React.FormEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const { status, onStart, onStop } = this.props;
    (status) ? onStop() : onStart();
  };


  render() {
    const { service_name, status } = this.props;

    return (
      <button onClick={this.handleOnChangeToggle}
              className={b(null, { [service_name]: true })}>
        {status ? <div className={b('pause')} /> : getIcon(LIST_ICON.PLAY, b('play'))}
      </button>
    );
  }
}

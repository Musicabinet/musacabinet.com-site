import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './cabinet-avatar.module.sass';
import { RootStore } from '../../../stores';

const b = block(style);

type CabinetAvatarProps = {
  fullName: string
};
type CabinetAvatarState = {};

@inject((store: RootStore) => ({
  fullName: store.userStore.fullName
}))
@observer
export class CabinetAvatar extends React.Component<CabinetAvatarProps, CabinetAvatarState> {

  static defaultProps = {
    fullName: ''
  };

  render() {
    const { fullName } = this.props;

    return (
      <div className={b(null)}>
        <button className={b('upload')}>
          Load
        </button>

        <div className={b('fullName')}>{fullName}</div>
        <a className={b('link')}>Edit profile</a>
      </div>
    );
  }
}

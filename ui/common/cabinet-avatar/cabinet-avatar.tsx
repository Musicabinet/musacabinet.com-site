import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './cabinet-avatar.module.sass';
import { RootStore } from '../../../stores';
import Link from 'next/link';

const b = block(style);

type CabinetAvatarProps = {
  fullName: string,
  avatar: string,
  onUpload: (file: File) => void
};
type CabinetAvatarState = {};

@inject((store: RootStore) => ({
  fullName: store.userStore.fullName,
  avatar: store.userStore.avatar,
  onUpload: store.userStore.upload
}))
@observer
export class CabinetAvatar extends React.Component<CabinetAvatarProps, CabinetAvatarState> {

  inputFileRef = React.createRef<HTMLInputElement>();

  static defaultProps = {
    fullName: '',
    avatar: '',
    onUpload: () => console.log('Not set handler')
  };

  handleOnClick = () => {
    if (this.inputFileRef.current) {
      this.inputFileRef.current.click();
    }
  };

  handleOnUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const { onUpload } = this.props;
    const { files } = e.currentTarget;

    if (files && files.length > 0) {
      const file = files[0];
      onUpload(file);
    }
  };

  render() {
    const { fullName, avatar } = this.props;

    return (
      <div className={b(null)}>
        <input type='file'
               className={b('input-file')}
               ref={this.inputFileRef}
               onChange={this.handleOnUpload} />
        {(avatar && avatar.length > 0)
          ? (
            <img src={`${CONTENT_URL}${avatar}`}
                 className={b('avatar')}
                 alt=''
                 onClick={this.handleOnClick} />
          )
          : (
            <button className={b('upload')}
                    onClick={this.handleOnClick}>
              Load
            </button>
          )}


        <div className={b('fullName')}>{fullName}</div>
        <Link href={'/cabinet/profile'}><a className={b('link')}>Edit profile</a></Link>
      </div>
    );
  }
}

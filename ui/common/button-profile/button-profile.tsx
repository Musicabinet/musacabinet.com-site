import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './button-profile.module.sass';
import { RootStore } from '../../../stores';
import { getAvatarLink } from '../../../helpers';
import Link from 'next/link';
import { LocalStorage } from '../../../core';

const b = block(style);

type ButtonProfileProps = {
  isAuth: boolean;
  avatar: string;
  fullName: string;
  email: string;
  onLogout: () => void;
};
type ButtonProfileState = {
  show: boolean;
  uuid: string;
};

@inject((store: RootStore) => ({
  isAuth: store.authStore.isAuth,
  avatar: store.userStore.avatar,
  fullName: store.userStore.fullName,
  email: store.userStore.email,
  onLogout: store.authStore.logout
}))
@observer
export class ButtonProfile extends React.Component<ButtonProfileProps, ButtonProfileState> {
  public containerRef = React.createRef<HTMLDivElement>();

  static defaultProps = {
    isAuth: false,
    avatar: '',
    fullName: '',
    email: '',
    onLogout: () => console.log('Not set handler')
  };

  state = {
    show: false,
    uuid: ''
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);

    this.setState({
      uuid: LocalStorage.get('lesson_id_q')
    });
  }

  componentDidUpdate({}, prevState: ButtonProfileState) {
    if (this.state.show !== prevState.show) {
      this.setState({
        uuid: LocalStorage.get('lesson_id_q')
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (e: MouseEvent) => {
    // @ts-ignore
    if (this.containerRef && this.containerRef.current && !this.containerRef.current.contains(e.target)) {
      this.setState({ show: false });
    }
  };

  handleOnShow = () => this.setState(() => ({ show: true }));

  render() {
    const { isAuth, avatar, fullName, email, onLogout } = this.props;
    const { uuid, show } = this.state;

    if (!isAuth) {
      return null;
    }

    return (
      <div className={b(null)} ref={this.containerRef}>
        <button onClick={this.handleOnShow} className={b('avatar')}>
          {avatar && avatar.length > 0 ? (
            <img src={getAvatarLink(avatar)} className={b('picture')} alt="" />
          ) : (
            <img
              src="/images/profile/profile.png"
              srcSet={`/images/profile/profile@2x.png`}
              className={b('userpick')}
            />
          )}

          <ul className={b('menu', { show })}>
            <li className={b('item', { username: true })}>
              <span className={b('username')}>{fullName || email}</span>
            </li>
            {uuid && uuid.length > 0 && (
              <li className={b('item')}>
                <Link href={`/lesson/[uuid]`} as={`/lesson/${uuid}`}>
                  <a className={b('link')}>Continue Learning</a>
                </Link>
              </li>
            )}

            <li className={b('item', { noPadding: true })}>
              <Link href={'/cabinet'} as={`/cabinet`}>
                <a className={b('link', { musicabinet: true })}>My profile</a>
              </Link>
            </li>
            <li className={b('item', { borderBottom: true })}>
              <Link href={'/cabinet/tutorials'} as={`/cabinet/tutorials`}>
                <a className={b('link')} target={'_blank'}>
                  Tutorials
                </a>
              </Link>
            </li>
            <li className={b('item')}>
              <a className={b('link')} onClick={onLogout}>
                Sign out
              </a>
            </li>
          </ul>
        </button>
      </div>
    );
  }
}

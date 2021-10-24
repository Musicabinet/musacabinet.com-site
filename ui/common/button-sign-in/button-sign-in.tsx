import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './button-sign-in.module.sass';
import { RootStore } from '../../../stores';
import { Button } from '../button/button';
import { SignInModal } from '../modals';
import { MODALS } from '../../../constants';
import { SignUpModal } from '../modals/sign-up/sign-up';

const b = block(style);

type ButtonSignInProps = {
  isAuth: boolean;
  onShow: (id_window: MODALS) => void;
};
type ButtonSignInState = {};

@inject((store: RootStore) => ({
  isAuth: store.authStore.isAuth,
  onShow: store.modalsStore.show
}))
@observer
export class ButtonSignIn extends React.Component<ButtonSignInProps, ButtonSignInState> {
  static defaultProps = {
    isAuth: false,
    onShow: () => console.log('Not set handler')
  };

  handleOnShow = () => {
    const { onShow } = this.props;
    onShow(MODALS.SIGN_IN);
  };

  render() {
    const { isAuth } = this.props;

    if (isAuth) {
      return null;
    }

    return (
      <>
        <Button name={'sign-in'} loading={false} onClick={this.handleOnShow} className={b(null)}>
          Sign In
        </Button>
        <SignInModal />
        <SignUpModal />
      </>
    );
  }
}

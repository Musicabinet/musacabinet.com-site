import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './sign-in.module.sass';
import { RootStore } from '../../../../stores';
import { Modal } from '../../modal/modal';
import { Title } from '../../title/title';
import { MODALS, SOCIAL_BUTTON_TYPE, TITLE_SIZE } from '../../../../constants';
import { IconForm1, IconForm2, IconForm3 } from '../../icons';
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FacebookClientResponsive } from '../../../../responsible';
import { ButtonSocial } from '../../button-social/button-social';

const b = block(style);

type SignInModalProps = {
  show: boolean,
  isFetchFacebook: boolean,
  onSignInFacebook: (data: FacebookClientResponsive) => void,
  onClose: (id_window: MODALS) => void
};
type SignInModalState = {};

@inject((store: RootStore) => ({
  show: store.modalsStore.list[MODALS.SIGN_IN],
  isFetchFacebook: store.authStore.isFetchFacebook,
  onSignInFacebook: store.authStore.loginFacebook,
  onClose: store.modalsStore.close
}))
@observer
export class SignInModal extends React.Component<SignInModalProps, SignInModalState> {

  static defaultProps = {
    show: false,
    isFetchFacebook: false,
    onClose: () => console.log('Not set handler')
  };

  handleOnClose = () => {
    const { onClose } = this.props;
    onClose(MODALS.SIGN_IN);
  };

  render() {
    const { show, isFetchFacebook, onSignInFacebook } = this.props;


    return (
      <Modal isOpen={show}
             onClose={this.handleOnClose}>
        <div className='container g-0'>
          <div className='row g-0'>
            <div className='col-md-6'>
              <div className={b('left')}>
                <Title className={b('title')} size={TITLE_SIZE.THIRD}>
                  Start your 14-days free trial
                </Title>

                <div className='row'>
                  <div className='col-12 d-flex align-items-center'>
                    <IconForm1 className={b('icon')} />
                    <p className={b('paragraph')}>
                      Our system is built to guide you step-by-step from 0 to Pro+ level
                    </p>
                  </div>
                </div>
                <div className={b('divider')} />
                <div className='row'>
                  <div className='col-12 d-flex align-items-center'>
                    <IconForm2 className={b('icon')} />
                    <p className={b('paragraph')}>
                      Intuitive & user-friendly interface, allowing you to enjoy the learning process
                    </p>
                  </div>
                </div>
                <div className={b('divider')} />
                <div className='row'>
                  <div className='col-12 d-flex align-items-center'>
                    <IconForm3 className={b('icon')} />
                    <p className={b('paragraph')}>
                      Study at home or while traveling from your Mac/PC, Tab or Smartphone
                    </p>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-12'>
                    <div className={b('footer')}>
                      Join now & find out how comfortable and convenient our eduction system is
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className='col-md-6'>
              <div className={b('right')}>
                <div className='row'>
                  <div className='col-12'>
                    <ReactFacebookLogin appId={'514163569493257'}
                                        callback={onSignInFacebook}
                                        disableMobileRedirect
                                        isMobile={false}
                                        render={(renderProps) => {
                                          return (
                                            /*
                                            // @ts-ignore */
                                            <ButtonSocial onClick={renderProps.onClick}
                                                          type={SOCIAL_BUTTON_TYPE.FACEBOOK}
                                                          disabled={isFetchFacebook}>
                                              Log in with Facebook
                                            </ButtonSocial>
                                          );
                                        }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

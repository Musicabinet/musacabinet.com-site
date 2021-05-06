import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './sign-in.module.sass';
import { RootStore } from '../../../../stores';
import { Modal } from '../../modal/modal';
import { Title } from '../../title/title';
import { MODALS, SOCIAL_BUTTON_TYPE, TITLE_SIZE } from '../../../../constants';
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { FacebookClientResponsive } from '../../../../responsible';
import { ButtonSocial } from '../../button-social/button-social';
import { HrWithText } from '../../hr-with-text/hr-with-text';
import { FormLogin } from '../../form-login/form-login';
import { getIcon, LIST_ICON } from '../../icons';

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
    onSignInFacebook: () => console.log('Not set handler'),
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
                    {getIcon(LIST_ICON.FORM_1, b('icon'))}
                    <p className={b('paragraph')}>
                      Our system is built to guide you step-by-step from 0 to Pro+ level
                    </p>
                  </div>
                </div>
                <div className={b('divider')} />
                <div className='row'>
                  <div className='col-12 d-flex align-items-center'>
                    {getIcon(LIST_ICON.FORM_2, b('icon'))}
                    <p className={b('paragraph')}>
                      Intuitive & user-friendly interface, allowing you to enjoy the learning process
                    </p>
                  </div>
                </div>
                <div className={b('divider')} />
                <div className='row'>
                  <div className='col-12 d-flex align-items-center'>
                    {getIcon(LIST_ICON.FORM_3, b('icon'))}
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

                <div className='row'>
                  <div className='col-12'>
                    <HrWithText>or</HrWithText>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-12'>
                    <GoogleLogin
                      clientId='826618397728-phql2reajkfudj3q0uosjuqb7tpjdlhf.apps.googleusercontent.com'
                      render={renderProps => (
                        <ButtonSocial onClick={renderProps.onClick}
                                      type={SOCIAL_BUTTON_TYPE.GOOGLE}>
                          Log in with Google
                        </ButtonSocial>
                      )}
                      buttonText='Login'
                      onSuccess={(data) => console.log(data)}
                      onFailure={(responseError) => console.log('responseError', responseError)}
                      cookiePolicy={'single_host_origin'}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div className='col-12'>
                    <div className={b('text-middle')}>
                      or log in with email
                    </div>
                  </div>
                </div>

                <FormLogin />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

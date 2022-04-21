import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './form-login.module.sass';
import { AuthStore, RootStore } from '../../../stores';
import { Formik } from 'formik';
import { loginValidationSchema } from '../../../validation-scheme';
import { InputText } from '../input-text/input-text';
import { Button } from '../button/button';
import { LoginRequestI } from '../../../interfaces';
import { MODALS } from '../../../constants';

const b = block(style);

type FormLoginProps = {
  authStore: AuthStore;
  onLogin: (data: LoginRequestI) => void;
  onShowModal: (id_modal: MODALS) => void;
  onCloseModal: (id_modal: MODALS) => void;
};
type FormLoginState = {};

@inject((store: RootStore) => ({
  authStore: store.authStore,
  onLogin: store.authStore.login,
  onShowModal: store.modalsStore.show,
  onCloseModal: store.modalsStore.close
}))
@observer
export class FormLogin extends React.Component<FormLoginProps, FormLoginState> {
  static defaultProps = {
    authStore: {},
    onLogin: () => console.log('Not set handler'),
    onShowModal: () => console.log('Not set handler'),
    onCloseModal: () => console.log('Not set handler')
  };

  handleOnSignUp = () => {
    const { onCloseModal, onShowModal } = this.props;
    onCloseModal(MODALS.SIGN_IN);
    onShowModal(MODALS.SIGN_UP);
  };

  render() {
    const { onLogin } = this.props;

    return (
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          email: '',
          password: ''
        }}
        validateOnBlur
        onSubmit={onLogin}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className='row'>
                <div className='col-12'>
                  <InputText name={'email'}
                             value={values.email}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             placeholder={'Your email'}
                             isValid={Boolean((touched.email && errors.email === undefined) || !dirty)}
                             errors={errors.email}
                  />
                </div>

                <div className={b('space', { '15': true })} />

                <div className='col-12'>
                  <InputText
                    name={'password'}
                    type={'password'}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={'Your password'}
                    isValid={Boolean((touched.email && errors.password === undefined) || !dirty)}
                    errors={errors.password}
                  />
                </div>

                <div className={b('space', { '15': true })} />

                <div className='col-12 d-flex justify-content-center'>
                  <button className={b('link')}>Forgot your password?</button>
                </div>

                <div className={b('space', { '15': true })} />

                <div className='col-12'>
                  <Button type={'submit'} full disabled={!isValid || !dirty}>
                    Sign in
                  </Button>
                </div>

                <div className={b('space', { '20': true })} />

                <div className={b('text')}>Don't have an account?</div>
                <div className='col-12 d-flex justify-content-center'>
                  <button onClick={this.handleOnSignUp} className={b('action')}>
                    Sign up
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './form-sign-up.module.sass';
import { AuthStore, RootStore } from '../../../stores';
import { Formik } from 'formik';
import { signUpValidationSchema } from '../../../validation-scheme';
import { InputText } from '../input-text/input-text';
import { Button } from '../button/button';
import { SignUpRequestI } from '../../../interfaces';
import { MODALS } from '../../../constants';

const b = block(style);

type FormSignUpProps = {
  authStore: AuthStore;
  onSignUp: (data: SignUpRequestI) => void;
  onShowModal: (id_modal: MODALS) => void;
  onCloseModal: (id_modal: MODALS) => void;
};
type FormSignUpState = {};

@inject((store: RootStore) => ({
  authStore: store.authStore,
  onSignUp: store.authStore.signUp,
  onShowModal: store.modalsStore.show,
  onCloseModal: store.modalsStore.close
}))
@observer
export class FormSignUp extends React.Component<FormSignUpProps, FormSignUpState> {
  static defaultProps = {
    authStore: {},
    onSignUp: () => console.log('Not set handler'),
    onShowModal: () => console.log('Not set handler'),
    onCloseModal: () => console.log('Not set handler')
  };

  handleOnSignIn = () => {
    const { onCloseModal, onShowModal } = this.props;
    onCloseModal(MODALS.SIGN_UP);
    onShowModal(MODALS.SIGN_IN);
  };

  handleOnCheckLogin = async (e: React.FormEvent<HTMLInputElement>) => {
    const { authStore } = this.props;
    const { value } = e.currentTarget;

    await authStore.checkLogin(value);
  };

  render() {
    const { onSignUp } = this.props;

    return (
      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={{
          email: '',
          password: ''
        }}
        validateOnBlur
        onSubmit={onSignUp}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <InputText
                    name={'email'}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={async (e: React.FormEvent<HTMLInputElement>) => {
                      handleBlur(e);
                      await this.handleOnCheckLogin(e);
                    }}
                    placeholder={'Your email'}
                    isValid={Boolean((touched.email && errors.email === undefined) || !dirty)}
                    errors={errors.email}
                  />
                </div>

                <div className={b('space', { '15': true })} />

                <div className="col-12 d-flex justify-content-center">
                  <button className={b('link')}>Forgot your password?</button>
                </div>

                <div className={b('space', { '15': true })} />

                <div className="col-12">
                  <Button type={'submit'} full disabled={!isValid || !dirty}>
                    Create account
                  </Button>
                </div>

                <div className={b('space', { '20': true })} />

                <div className={b('text')}>Already have an account?</div>
                <div className="col-12 d-flex justify-content-center">
                  <button onClick={this.handleOnSignIn} className={b('action')}>
                    Log In
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

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './form-login.module.sass';
import { RootStore } from '../../../stores';
import { Formik } from 'formik';
import { loginValidationSchema } from '../../../validation-scheme';
import { InputText } from '../input-text/input-text';
import { Button } from '../button/button';
import { LoginRequestI } from '../../../interfaces';

const b = block(style);

type FormLoginProps = {
  onLogin: (data: LoginRequestI) => void
};
type FormLoginState = {};

@inject((store: RootStore) => ({
  onLogin: store.authStore.login
}))
@observer
export class FormLogin extends React.Component<FormLoginProps, FormLoginState> {

  static defaultProps = {
    onLogin: () => console.log('Not set handler')
  };

  render() {
    const { onLogin } = this.props;

    return (
      <Formik validationSchema={loginValidationSchema}
              initialValues={{
                email: 'admin@musicabinet.com',
                password: ''
              }}
              validateOnBlur
              onSubmit={onLogin}>

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
                             isValid={Boolean(touched.email && errors.email === undefined || !dirty)}
                             errors={errors.email} />
                </div>

                <div className={b('space', { '15': true })} />

                <div className='col-12'>
                  <InputText name={'password'}
                             type={'password'}
                             value={values.password}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             placeholder={'Your password'}
                             isValid={Boolean(touched.email && errors.password === undefined || !dirty)}
                             errors={errors.password} />
                </div>

                <div className={b('space', { '15': true })} />

                <div className='col-12 d-flex justify-content-center'>
                  <button className={b('link')}>Forgot your password?</button>
                </div>

                <div className={b('space', { '15': true })} />

                <div className='col-12'>
                  <Button type={'submit'}
                          full
                          disabled={!isValid || !dirty}>Log in</Button>
                </div>

                <div className={b('space', { '20': true })} />

                <div className={b('text')}>Don't have an account?</div>
                <div className='col-12 d-flex justify-content-center'>
                  <button className={b('action')}>Sign up</button>
                </div>
              </div>

            </form>);
        }}


      </Formik>
    );
  }
}

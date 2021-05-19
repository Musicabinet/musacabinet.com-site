import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './form-sign-up.module.sass';
import { RootStore } from '../../../stores';
import { Formik } from 'formik';
import { signUpValidationSchema } from '../../../validation-scheme';
import { InputText } from '../input-text/input-text';
import { Button } from '../button/button';
import { LoginRequestI } from '../../../interfaces';

const b = block(style);

type FormSignUpProps = {
  onSignUp: (data: LoginRequestI) => void
};
type FormSignUpState = {};

@inject((store: RootStore) => ({
  onSignUp: store.authStore.signUp
}))
@observer
export class FormSignUp extends React.Component<FormSignUpProps, FormSignUpState> {

  static defaultProps = {
    onSignUp: () => console.log('Not set handler')
  };

  render() {
    const { onSignUp } = this.props;

    return (
      <Formik validationSchema={signUpValidationSchema}
              initialValues={{
                email: '',
                password: ''
              }}
              validateOnBlur
              onSubmit={onSignUp}>

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

                <div className='col-12 d-flex justify-content-center'>
                  <button className={b('link')}>Forgot your password?</button>
                </div>

                <div className={b('space', { '15': true })} />

                <div className='col-12'>
                  <Button type={'submit'}
                          full
                          disabled={!isValid || !dirty}>Create account</Button>
                </div>

                <div className={b('space', { '20': true })} />

                <div className={b('text')}>Already have an account?</div>
                <div className='col-12 d-flex justify-content-center'>
                  <button className={b('action')}>Log In</button>
                </div>
              </div>

            </form>);
        }}


      </Formik>
    );
  }
}

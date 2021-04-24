import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './header.module.sass';
import { Logotype } from '../logotype/logotype';
import { Motto } from '../motto/motto';
import { Menu } from '../menu/menu';
import { ButtonSignIn } from '../button-sign-in/button-sign-in';
import { ButtonProfile } from '../button-profile/button-profile';

const b = block(style);

type HeaderProps = {};
type HeaderState = {};

@inject(() => ({}))
@observer
export class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    return (
      <header className={b(null)}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-2 col-xl-5 col-4 d-flex align-items-center'>
              <Logotype />
              <Motto />
            </div>
            <div
              className={`col-lg-10 col-xl-7 col-8 d-flex justify-content-end align-items-center justify-content-start ${b('rightside')}`}>
              <Menu />
              <ButtonSignIn />
              <ButtonProfile />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

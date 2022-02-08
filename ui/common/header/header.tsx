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

type HeaderProps = {
  noStick: boolean;
};
type HeaderState = {};

@inject(() => ({}))
@observer
export class Header extends React.Component<HeaderProps, HeaderState> {
  headerRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener('scroll', this.detectScrollHeader);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.detectScrollHeader);
  }

  detectScrollHeader = () => {
    if (this.headerRef.current) {
      const header = this.headerRef.current;
      if (window.pageYOffset > header.offsetTop) {
        header.classList.add(b('sticky').toString());
      } else {
        header.classList.remove(b('sticky').toString());
      }
    }
  };

  render() {
    const { noStick } = this.props;

    return (
      <header className={b(null, { noStick })} ref={this.headerRef}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 col-xl-5 col-4 d-flex align-items-center">
              <Logotype />
              <Motto />
            </div>
            <div className={`col-lg-10 col-xl-7 col-8 d-flex justify-content-lg-end align-items-center justify-content-start ${b(
                'rightside'
              )}`}>
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

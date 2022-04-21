import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './footer.module.sass';
import { RootStore } from '../../../stores';
import { MenuI } from '../../../interfaces';
import Link from 'next/link';

const b = block(style);

type FooterProps = {
  menu: MenuI[];
};
type FooterState = {};

@inject((store: RootStore) => ({
  menu: store.menuListStore.footer_list
}))
@observer
export class Footer extends React.Component<FooterProps, FooterState> {
  static defaultProps = {
    menu: []
  };

  render() {
    const { menu } = this.props;
    return (
      <footer className={b(null)}>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className={b('copyright')}>&copy; MUSICABINET LLC, 2017 - 2021<br /> All rights reserved</div>
            </div>
          </div>
        </div>

        <div className={b('menu')}>
          <div className='container'>
            <div className='row'>
              {menu.map((item) => {
                const { title, link } = item;
                return (
                  <div key={link} className='col-lg-3 text-center'>
                    <Link href={`/${link}`}>
                      <a className={b('link')}>{title}</a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

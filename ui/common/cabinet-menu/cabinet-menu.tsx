import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './cabinet-menu.module.sass';
import { RootStore } from '../../../stores';
import { MenuI } from '../../../interfaces';
import { CabinetMenuItem } from './item';
import { NextRouter, withRouter } from 'next/router';

const b = block(style);

type CabinetMenuProps = {
  list: MenuI[],
  router: NextRouter
};
type CabinetMenuState = {};

@inject((store: RootStore) => ({
  list: store.menuListStore.cabinet_list
}))
@(withRouter as any)
@observer
export class CabinetMenu extends React.Component<CabinetMenuProps, CabinetMenuState> {

  static defaultProps = {
    list: [],
    router: {}
  };

  render() {
    const { list, router } = this.props;
    return (
      <nav className={b(null)}>
        <ul className={b('list')}>
          {list.map((item) => {
            return <CabinetMenuItem key={`${item.type}_${item.title}`} title={item.title}
                                    link={item.link}
                                    type={item.type}
                                    is_active={item.link === router.pathname} />;
          })}
        </ul>
      </nav>
    );
  }
}



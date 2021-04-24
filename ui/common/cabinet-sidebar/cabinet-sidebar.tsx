import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './cabinet-sidebar.module.sass';
import { CabinetAvatar } from '../cabinet-avatar/cabinet-avatar';
import { CabinetMenu } from '../cabinet-menu/cabinet-menu';

const b = block(style);

type CabinetSidebarProps = {};
type CabinetSidebarState = {};

@inject(() => ({}))
@observer
export class CabinetSidebar extends React.Component<CabinetSidebarProps, CabinetSidebarState> {
  render() {
    return (
      <div className={b(null)}>
        <CabinetAvatar />
        <CabinetMenu />
      </div>
    );
  }
}

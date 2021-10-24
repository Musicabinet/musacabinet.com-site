import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './cabinet-layout.module.sass';
import { CabinetSidebar } from '../cabinet-sidebar/cabinet-sidebar';

const b = block(style);

type CabinetLayoutProps = {};
type CabinetLayoutState = {};

@inject(() => ({}))
@observer
export class CabinetLayout extends React.Component<CabinetLayoutProps, CabinetLayoutState> {
  render() {
    const { children } = this.props;

    return (
      <div className="col-12">
        <div className={b(null)}>
          <CabinetSidebar />

          <div className={b('content')}>{children}</div>
        </div>
      </div>
    );
  }
}

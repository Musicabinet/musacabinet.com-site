import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './divider-vertical.module.sass';
import { RootStore, SystemStore } from '../../../../../../stores';

const b = block(style);

type DividerVerticalProps = {
  systemStore: SystemStore
};
type DividerVerticalState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore
}))
@observer
export class DividerVertical extends React.Component<DividerVerticalProps, DividerVerticalState> {

  static defaultProps = {
    systemStore: {}
  };

  render() {
    const { systemStore } = this.props;

    return (
      <div className={b(null, { [systemStore.service_name]: true })} />
    );
  }
}

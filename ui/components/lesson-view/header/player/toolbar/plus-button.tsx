import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './toolbar.module.sass';
import { RootStore } from '../../../../../../stores';
import { SERVICE_NAME } from '../../../../../../constants';

const b = block(style);

type PlusButtonProps = {
  service_name: SERVICE_NAME;
};
type PlusButtonState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name
}))
@observer
export class PlusButton extends React.Component<PlusButtonProps, PlusButtonState> {
  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL
  };

  render() {
    const { service_name } = this.props;
    return <button className={b('plus-button', { [service_name]: true })} />;
  }
}

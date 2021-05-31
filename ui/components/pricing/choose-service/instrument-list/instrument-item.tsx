import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instrument-list.module.sass';
import { RootStore } from '../../../../../stores';
import { InstrumentI } from '../../../../../interfaces';
import { InstrumentIcon } from '../../../../common';
import { SERVICE_NAME } from '../../../../../constants';

const b = block(style);

type InstrumentItemProps = {
  service_name: SERVICE_NAME
};
type InstrumentItemState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name
}))
@observer
export class InstrumentItem extends React.Component<InstrumentItemProps & InstrumentI, InstrumentItemState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL
  };

  render() {
    const { icon, service_name, is_active } = this.props;
    return (
      <>
        <button disabled={!is_active}
                className={b('item')}>
          <InstrumentIcon icon={icon} service={service_name} />
        </button>
      </>
    );
  }
}

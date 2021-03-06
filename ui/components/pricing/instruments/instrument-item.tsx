import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './instruments.module.sass';
import { RootStore } from '../../../../stores';
import { InstrumentI } from '../../../../interfaces';
import { InstrumentIcon } from '../../../common';
import { SERVICE_NAME } from '../../../../constants';
import { LIST_ICON } from '../../../common/icons';

const b = block(style);

type InstrumentItemProps = {
  service_name: SERVICE_NAME;
  selected: boolean;
  onSetInstrument: (value: LIST_ICON) => void;
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

  handleOnChange = () => {
    const { icon, onSetInstrument } = this.props;
    onSetInstrument(icon);
  };

  render() {
    const { icon, selected } = this.props;

    return (
      <div className="col-lg-4 d-flex align-items-center justify-content-center" onClick={this.handleOnChange}>
        <div className={b('button', { selected })}>
          <InstrumentIcon icon={icon} service={selected ? 'selected' : 'default'} />
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './arrow.module.sass';
import { RootStore } from '../../../../../../stores';
import { SERVICE_NAME } from '../../../../../../constants';

const b = block(style);

type ArrowProps = {
  service_name: SERVICE_NAME;
  show: boolean;
};
type ArrowState = {};

@inject((store: RootStore) => ({
  service_name: store.lessonStore.group_lesson?.collections?.serviceName
}))
@observer
export class Arrow extends React.Component<ArrowProps, ArrowState> {
  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL
  };

  render() {
    const { show, service_name } = this.props;

    return (
      <button
        className={b(null, {
          show,
          [service_name]: true
        })}
      >
        <div className={b('triangle')} />
      </button>
    );
  }
}

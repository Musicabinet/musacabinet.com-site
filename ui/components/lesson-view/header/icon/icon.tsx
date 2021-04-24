import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './icon.module.sass';
import { RootStore } from '../../../../../stores';
import { SERVICE_NAME } from '../../../../../constants';

const b = block(style);

type IconProps = {
  instrument_name: string,
  service_name: SERVICE_NAME
};
type IconState = {};

@inject((store: RootStore) => ({
  service_name: store.lessonStore.group_lesson?.collections?.serviceName,
  instrument_name: store.lessonStore.group_lesson?.collections?.instrumentName
}))
@observer
export class Icon extends React.Component<IconProps, IconState> {

  static defaultProps = {
    instrument_name: '',
    service_name: SERVICE_NAME.SCHOOL
  };

  render() {
    const { instrument_name, service_name } = this.props;

    return <div className={b(null, {
      [service_name]: true
    })}>
      <div className={b('name-instrument')}>{instrument_name}</div>

    </div>;
  }
}

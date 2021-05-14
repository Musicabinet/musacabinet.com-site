import * as React from 'react';
import block from 'bem-css-modules';
import style from './title.module.sass';
import { SERVICE_NAME, TITLE_SIZE } from '../../../constants';
import { inject, observer } from 'mobx-react';
import { RootStore } from '../../../stores';

const b = block(style);

type TitleProps = {
  size: TITLE_SIZE,
  className: string,
  isServiceColor: boolean,
  service_name: SERVICE_NAME
};
type TitleState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name
}))
@observer
export class Title extends React.Component<TitleProps, TitleState> {

  static defaultProps = {
    size: TITLE_SIZE.THIRD,
    isServiceColor: false,
    service_name: SERVICE_NAME.SCHOOL,
    className: ''
  };

  render() {
    const { size, className, children, service_name, isServiceColor } = this.props;

    return <div className={`${b(null, {
      [size]: true,
      [service_name]: isServiceColor
    })} ${className}`}>{children}</div>;
  }
}

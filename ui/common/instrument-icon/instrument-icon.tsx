import * as React from 'react';
import style from './instrument-icon.module.sass';
import block from 'bem-css-modules';
import { SERVICE_NAME } from '../../../constants';
import { getIcon, LIST_ICON } from '../icons';

const b = block(style);

type InstrumentIconProps = {
  icon: LIST_ICON;
  service: SERVICE_NAME | 'default' | 'selected' | 'white';
  size: 'small';
  className: string;
};
type InstrumentIconState = {};

export class InstrumentIcon extends React.Component<InstrumentIconProps, InstrumentIconState> {
  static defaultProps = {
    size: 'small',
    className: ''
  };

  getNameClass = (): string => {
    const { service, icon } = this.props;

    // Формируем название класса стилей
    return `${service.toLowerCase()}-${icon.toLowerCase()}`;
  };

  render() {
    const { icon, size } = this.props;

    return getIcon(
      icon,
      b('icon', {
        [this.getNameClass()]: true,
        size
      })
    );
  }
}

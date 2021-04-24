import * as React from 'react';
import style from './instrument-icon.module.sass';
import block from 'bem-css-modules';
import { IconGuitar, IconKeys, IconSax } from '../icons';
import { ICONS_NAME, SERVICE_NAME } from '../../../constants';

const b = block(style);

type InstrumentIconProps = {
  icon: ICONS_NAME,
  service: SERVICE_NAME,
  size: 'small'
};
type InstrumentIconState = {};

export class InstrumentIcon extends React.Component<InstrumentIconProps, InstrumentIconState> {

  static defaultProps = {
    icon: ICONS_NAME.GUITAR,
    size: 'small'
  };

  getIcon = () => {
    const { icon, service, size } = this.props;
    const guitarClass = `${service}-guitar`;
    const keyboardClass = `${service}-keyboards`;
    const saxophoneClass = `${service}-saxophone`;

    if (icon === ICONS_NAME.GUITAR) {
      return <IconGuitar className={b('icon', {
        [guitarClass]: true,
        size
      })} />;
    } else if (icon === ICONS_NAME.KEYBOARD) {
      return <IconKeys className={b('icon', {
        [keyboardClass]: true,
        size
      })} />;
    } else if (icon === ICONS_NAME.SAXOPHONE) {
      return <IconSax className={b('icon', {
        [saxophoneClass]: true,
        size
      })} />;
    } else {
      return null;
    }

  };

  render() {
    return this.getIcon();
  }
}

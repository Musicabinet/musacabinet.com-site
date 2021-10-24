import * as React from 'react';
import block from 'bem-css-modules';
import style from './button-social.module.sass';
import { SOCIAL_BUTTON_TYPE } from '../../../constants';

const b = block(style);

type ButtonSocialProps = {
  type: SOCIAL_BUTTON_TYPE;
  disabled: boolean;
  onClick: any;
};
type ButtonSocialState = {};

export class ButtonSocial extends React.Component<ButtonSocialProps, ButtonSocialState> {
  static defaultProps = {
    disabled: false
  };

  render() {
    const { type, children, disabled, onClick } = this.props;

    return (
      <button disabled={disabled} className={b(null, { [type]: true })} onClick={onClick}>
        {children}
      </button>
    );
  }
}

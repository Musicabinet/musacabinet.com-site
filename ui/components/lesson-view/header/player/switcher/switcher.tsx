import * as React from 'react';
import block from 'bem-css-modules';
import style from './switcher.module.sass';

const b = block(style);

type SwitcherProps = {
  label: string,
  checked: boolean,
  service_name: string,
  disabled: boolean,
  onChange: () => void
};
type SwitcherState = {
  checked: boolean
};

export class Switcher extends React.Component<SwitcherProps, SwitcherState> {

  state = {
    checked: this.props.checked
  };

  handleOnChange = () => {
    const { disabled } = this.props;

    if (disabled) {
      return false;
    }

    this.setState((state) => ({ checked: !state.checked }), () => {
      const { onChange } = this.props;
      onChange();
    });
  };

  render() {
    const { service_name, label, disabled } = this.props;
    const { checked } = this.state;

    return (
      <div className={b(null)}>
        <div className={b('container', { disabled })}>
          <span className={b('off')}>Off</span>
          <div className={b('switch', {
            [service_name]: true,
            off: disabled ? disabled : checked
          })}
               onClick={this.handleOnChange}>
            On <div className={b('circle')} />
          </div>
        </div>
        <label className={b('label')}
               onClick={this.handleOnChange}>{label}</label>
      </div>
    );
  }
}

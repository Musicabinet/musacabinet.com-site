import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './switcher.module.sass';

const b = block(style);

type SwitcherProps = {
  checked: boolean,
  onChange: (checked: boolean) => void
};
type SwitcherState = {
  checked: boolean
};

@inject(() => ({}))
@observer
export class Switcher extends React.Component<SwitcherProps, SwitcherState> {

  state = {
    checked: this.props.checked,
  };

  handleOnClick = () => {
    const { onChange } = this.props;
    this.setState(state => {

      return {
        checked: !state.checked,
      };
    }, () => {
      onChange(this.state.checked);
    });
  };

  render() {
    const { checked } = this.state;

    return (
      <div className={b(null)}>
        <div className={b('wrapper')}
             onClick={this.handleOnClick}>
          <div className={b('circle', { checked })} />
        </div>
      </div>
    );
  }
}

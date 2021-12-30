import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './button.module.sass';
import { MetronomeStore, RootStore, SystemStore } from '../../../../../../stores';
import { METRONOME_BUTTON_TYPE } from '../../../../../../constants';

const b = block(style);

type ButtonProps = {
  systemStore: SystemStore,
  metronomeStore: MetronomeStore,
  type: METRONOME_BUTTON_TYPE,
};
type ButtonState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  metronomeStore: store.metronomeStore
}))
@observer
export class Button extends React.Component<ButtonProps, ButtonState> {

  interval: number = 0;

  static defaultProps = {
    systemStore: {},
    metronomeStore: {}
  };

  handleOnChange = (e: React.FormEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { metronomeStore, type } = this.props;
    let updateValue = 0;
    if (type === METRONOME_BUTTON_TYPE.INCREMENT) {
      updateValue = metronomeStore.current + 1;
    } else {
      updateValue = metronomeStore.current - 1;
    }

    if (updateValue < 200) {
      metronomeStore.setBPM(Number(updateValue));
    } else {
      metronomeStore.setBPM(200);
    }
  };

  handleOnMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.interval = window.setInterval(() => {
      this.handleOnChange(e);
    }, 150);
  };

  handleOnMouseUp = () => {
    clearInterval(this.interval);
  };

  render() {
    const { type, systemStore } = this.props;

    return (
      <button onClick={this.handleOnChange}
              onMouseDown={this.handleOnMouseDown}
              onMouseUp={this.handleOnMouseUp}
              className={b(null, {
                [type]: true,
                [systemStore.service_name]: true
              })}>
        {type === METRONOME_BUTTON_TYPE.INCREMENT ? '+' : '-'}
      </button>
    );
  }
}

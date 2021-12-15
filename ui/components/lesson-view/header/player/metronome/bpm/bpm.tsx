import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './bpm.module.sass';
import { MetronomeStore, RootStore, SystemStore } from '../../../../../../../stores';

const b = block(style);

type BpmProps = {
  systemStore: SystemStore,
  metronomeStore: MetronomeStore,
};
type BpmState = {};

@inject((store: RootStore) => ({
  systemStore: store.systemStore,
  metronomeStore: store.metronomeStore
}))
@observer
export class Bpm extends React.Component<BpmProps, BpmState> {
  interval: number = 0;
  inputRef = React.createRef<HTMLInputElement>();

  static defaultProps = {
    systemStore: {},
    metronomeStore: {}
  };

  constructor(props: BpmProps) {
    super(props);
  }

  handleOnIncrement = (e: React.FormEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { metronomeStore } = this.props;
    const updateValue = metronomeStore.current + 1;

    if (updateValue < 200) {
      metronomeStore.setBPM(Number(updateValue));

      if (this.inputRef.current) {
        this.inputRef.current.value = String(updateValue);
      }
    }
  };

  handleOnDecrement = (e: React.FormEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { metronomeStore } = this.props;
    const updateValue = metronomeStore.current - 1;

    if (updateValue > 20) {
      metronomeStore.setBPM(Number(updateValue));

      if (this.inputRef.current) {
        this.inputRef.current.value = String(updateValue);
      }
    }
  };

  handleOnMouseDown = (type: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'increment') {
      this.interval = window.setInterval(() => {
        this.handleOnIncrement(e);
      }, 150);
    } else if (type === 'decrement') {
      this.interval = window.setInterval(() => {
        this.handleOnDecrement(e);
      }, 150);
    }
  };

  handleOnMouseUp = () => {
    clearInterval(this.interval);
  };

  handleOnBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const { metronomeStore } = this.props;
    const currentValue = Number(e.currentTarget.value);

    if (currentValue > 20 && currentValue < 200) {
      metronomeStore.setBPM(currentValue);
    } else {
      if (this.inputRef.current) {
        this.inputRef.current.value = String(metronomeStore.current);
      }
    }
  };

  render() {
    const { systemStore, metronomeStore } = this.props;

    return (
      <div
        className={b(null, {
          [systemStore.service_name]: true
        })}
      >
        <button
          className={b('button', {
            increment: true
          })}
          onClick={this.handleOnIncrement}
          onMouseDown={this.handleOnMouseDown.bind(null, 'increment')}
          onMouseUp={this.handleOnMouseUp}
        />
        <input
          type={'number'}
          ref={this.inputRef}
          onBlur={this.handleOnBlur}
          className={b('count')}
          value={metronomeStore.current}
        />
        <button
          className={b('button', {
            decrement: true
          })}
          onClick={this.handleOnDecrement}
          onMouseDown={this.handleOnMouseDown.bind(null, 'decrement')}
          onMouseUp={this.handleOnMouseUp}
        />
      </div>
    );
  }
}

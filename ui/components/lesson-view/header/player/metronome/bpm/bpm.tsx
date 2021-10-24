import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './bpm.module.sass';
import { RootStore } from '../../../../../../../stores';
import { SERVICE_NAME } from '../../../../../../../constants';

const b = block(style);

type BpmProps = {
  service_name: SERVICE_NAME;
  current: number;
  onSetBPM: (value: number) => void;
};
type BpmState = {};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  current: store.metronomeStore.current,
  onSetBPM: store.metronomeStore.setBPM
}))
@observer
export class Bpm extends React.Component<BpmProps, BpmState> {
  interval: number = 0;
  inputRef = React.createRef<HTMLInputElement>();

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    current: 80,
    onSetBPM: () => console.log('Not set handler')
  };

  constructor(props: BpmProps) {
    super(props);
  }

  handleOnIncrement = (e: React.FormEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { current, onSetBPM } = this.props;
    const updateValue = current + 1;

    if (updateValue < 200) {
      onSetBPM(Number(updateValue));

      if (this.inputRef.current) {
        this.inputRef.current.value = String(updateValue);
      }
    }
  };

  handleOnDecrement = (e: React.FormEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { current, onSetBPM } = this.props;
    const updateValue = current - 1;

    if (updateValue > 20) {
      onSetBPM(Number(updateValue));

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
    const currentValue = Number(e.currentTarget.value);

    if (currentValue > 20 && currentValue < 200) {
      const { onSetBPM } = this.props;
      onSetBPM(currentValue);
    } else {
      if (this.inputRef.current) {
        const { current } = this.props;
        this.inputRef.current.value = String(current);
      }
    }
  };

  render() {
    const { service_name, current } = this.props;

    return (
      <div
        className={b(null, {
          [service_name]: true
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
          defaultValue={current}
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

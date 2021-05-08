import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './bpm.module.sass';
import { RootStore } from '../../../../../../../stores';
import { SERVICE_NAME } from '../../../../../../../constants';

const b = block(style);

type BpmProps = {
  service_name: SERVICE_NAME,
  current: number,
  onIncrement: () => void,
  onDecrement: () => void,
  onSet: (value: number) => void
};
type BpmState = {};

@inject((store: RootStore) => ({
  onSet: store.playerStore.setBpm
}))
@observer
export class Bpm extends React.Component<BpmProps, BpmState> {

  interval: number = 0;

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    current: 120,
    onIncrement: () => console.log('Not set handler'),
    onDecrement: () => console.log('Not set handler'),
    onSet: () => console.log('Not set handler')
  };

  handleOnIncrement = (e: React.FormEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { onIncrement } = this.props;
    onIncrement();
  };

  handleOnDecrement = (e: React.FormEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { onDecrement } = this.props;
    onDecrement();
  };

  handleOnMouseDown = (type: string) => {
    const { onIncrement, onDecrement } = this.props;

    if (type === 'increment') {
      this.interval = window.setInterval(() => {
        onIncrement();
      }, 100);
    } else if (type === 'decrement') {
      this.interval = window.setInterval(() => {
        onDecrement();
      }, 100);
    }
  };

  handleOnMouseUp = () => {
    clearInterval(this.interval);
  };

  handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const { onSet } = this.props;
    onSet(Number(value));
  };

  render() {
    const { service_name, current } = this.props;

    return (
      <div className={b(null, {
        [service_name]: true
      })}>
        <button className={b('button', {
          increment: true
        })}
                onClick={this.handleOnIncrement}
                onMouseDown={this.handleOnMouseDown.bind(null, 'increment')}
                onMouseUp={this.handleOnMouseUp} />
        <input type={'number'}
               onChange={this.handleOnChange}
               className={b('count')}
               value={current} />
        <button className={b('button', {
          decrement: true
        })}
                onClick={this.handleOnDecrement}
                onMouseDown={this.handleOnMouseDown.bind(null, 'decrement')}
                onMouseUp={this.handleOnMouseUp} />
      </div>
    );
  }
}

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './start.module.sass';
import { SERVICE_NAME } from '../../../../../../../constants';
import { RootStore } from '../../../../../../../stores';

const b = block(style);

type StartButtonProps = {
  service_name: SERVICE_NAME,
  disabled: boolean,
  isPlay: boolean,
  onPlayStop: () => void
};
type StartButtonState = {
  is_active: boolean
};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name,
  isPlay: store.metronomeStore.isPlay,
  onPlayStop: store.metronomeStore.onPlayStop
}))
@observer
export class StartButton extends React.Component<StartButtonProps, StartButtonState> {

  buttonContainerRef = React.createRef<HTMLButtonElement>();

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL,
    disabled: false,
    isPlay: false,
    onPlayStop: () => console.log("Not set handler")
  }

  getStatus = () => (this.props.isPlay) ? 'Stop' : 'Start';

  handleOnFocus = () => {
    const { is_active } = this.state;
    if (!is_active) {
      this.setState({
        is_active: true
      });
      document.addEventListener('keydown', this.clickSpace);
    }
  };

  handleOnBlur = () => {
    const { is_active } = this.state;
    if (is_active) {
      this.setState({
        is_active: false
      });
      document.removeEventListener('keydown', this.clickSpace);
    }
  };

  clickSpace = (e: any) => {
    const {onPlayStop} = this.props;
    if(e.keyCode === 32){
      onPlayStop();
    }
  };

  render() {
    const {disabled, service_name, onPlayStop} = this.props;

    return (
      <button disabled={disabled}
              //onFocus={this.handleOnFocus}
              //onBlur={this.handleOnBlur}
              className={b(null, {
                [service_name]: true
              })}
              ref={this.buttonContainerRef}
              id='play-metronome'
              onClick={() => {
                if(this.buttonContainerRef.current){
                  this.buttonContainerRef.current.focus();
                  onPlayStop();
                }
              }}>{this.getStatus()}</button>
    );
  }
}
